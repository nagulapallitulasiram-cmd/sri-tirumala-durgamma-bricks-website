Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Bitmap]::FromFile("c:\Users\Tulasi Ram\OneDrive\Documents\Desktop\Bricks\assets\premium_clay_brick.png")
$w = $img.Width
$h = $img.Height

$minX = $w
$maxX = 0
$minY = $h
$maxY = 0

for ($y = 0; $y -lt $h; $y += 4) {
    for ($x = 0; $x -lt $w; $x += 4) {
        $pixel = $img.GetPixel($x, $y)
        # Check if the pixel is not black/very dark
        if ($pixel.R -gt 15 -or $pixel.G -gt 15 -or $pixel.B -gt 15) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Output "Image size: ${w}x${h}"
Write-Output "Bounding box of non-black pixels: X: $minX to $maxX, Y: $minY to $maxY"
Write-Output "BBox Size: $($maxX - $minX)x$($maxY - $minY)"
$img.Dispose()
