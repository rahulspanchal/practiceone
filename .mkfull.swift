import AppKit
import Foundation

// Renders the exact JS splash design (SplashBackground.tsx) to a full-screen PNG.
let args = CommandLine.arguments
let logoPath = args[1]
let outPath = args[2]
let W: CGFloat = CGFloat(Double(args[3]) ?? 1080)
let H: CGFloat = CGFloat(Double(args[4]) ?? 2400)

func hex(_ s: String, _ a: CGFloat = 1) -> NSColor {
    var h = s
    if h.hasPrefix("#") { h.removeFirst() }
    let r = CGFloat(Int(h.prefix(2), radix: 16)!) / 255
    let g = CGFloat(Int(h.dropFirst(2).prefix(2), radix: 16)!) / 255
    let b = CGFloat(Int(h.dropFirst(4).prefix(2), radix: 16)!) / 255
    return NSColor(red: r, green: g, blue: b, alpha: a)
}

let rep = NSBitmapImageRep(
    bitmapDataPlanes: nil, pixelsWide: Int(W), pixelsHigh: Int(H),
    bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false,
    colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!

NSGraphicsContext.saveGraphicsState()
NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: rep)

let cx = W / 2
let cy = H / 2
let center = NSPoint(x: cx, y: cy)
let maxRadius = (W * W / 4 + H * H / 4).squareRoot()

// Density scale relative to the JS layout (411dp wide ~ 1080px => ~2.63).
let scale = W / 411.0

// 1) Background radial gradient (splashFill)
let fill = NSGradient(
    colors: [hex("#FEF7EF"), hex("#FCE9D2"), hex("#F8D3A8"), hex("#F4BE87")],
    atLocations: [0, 0.42, 0.72, 1],
    colorSpace: .deviceRGB)!
fill.draw(
    fromCenter: center, radius: 0,
    toCenter: center, radius: maxRadius,
    options: [.drawsBeforeStartingLocation, .drawsAfterEndingLocation])

// 2) Concentric rings
let ringCount = 6
let innerRing = maxRadius * 0.36
let ringGap = (maxRadius - innerRing) / CGFloat(ringCount - 1)
hex("#FFFFFF", 0.45).setStroke()
for i in 0..<ringCount {
    let r = innerRing + ringGap * CGFloat(i)
    let path = NSBezierPath(
        ovalIn: NSRect(x: cx - r, y: cy - r, width: r * 2, height: r * 2))
    path.lineWidth = max(1, 1 * scale)
    path.stroke()
}

// 3) Cream disc (splashDisc), clipped to its circle
let discRadius = W * 0.44
NSGraphicsContext.saveGraphicsState()
let clip = NSBezierPath(
    ovalIn: NSRect(
        x: cx - discRadius, y: cy - discRadius,
        width: discRadius * 2, height: discRadius * 2))
clip.addClip()
let disc = NSGradient(
    colors: [hex("#FFFFFF", 1), hex("#FFFAF4", 1), hex("#FEF3E7", 1), hex("#FCECDA", 0)],
    atLocations: [0, 0.6, 0.9, 1],
    colorSpace: .deviceRGB)!
disc.draw(
    fromCenter: center, radius: 0,
    toCenter: center, radius: discRadius,
    options: [])
NSGraphicsContext.restoreGraphicsState()

// 4) Logo centered (width = 62% of screen width, preserve aspect 699:233)
if let logo = NSImage(contentsOfFile: logoPath) {
    let lw = W * 0.62
    let lh = lw * (233.0 / 699.0)
    logo.draw(
        in: NSRect(x: cx - lw / 2, y: cy - lh / 2, width: lw, height: lh),
        from: NSRect(origin: .zero, size: logo.size),
        operation: .sourceOver, fraction: 1.0)
}

NSGraphicsContext.restoreGraphicsState()

if let data = rep.representation(using: .png, properties: [:]) {
    try! data.write(to: URL(fileURLWithPath: outPath))
    print("wrote \(outPath) \(Int(W))x\(Int(H))")
} else { print("encode failed"); exit(1) }
