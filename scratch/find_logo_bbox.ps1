Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Bitmap]::FromFile("c:\Users\Tulasi Ram\OneDrive\Documents\Desktop\Bricks\assets\premium_clay_brick.png")
$w = $img.Width
$h = $img.Height

# Bounding box of the brick area (where color is reddish/clay)
# We saw that Pixel(512,512) is R=133, G=59, B=30.
# Let's find the brick bounds.
$brickMinX = $w
$brickMaxX = 0
$brickMinY = $h
$brickMaxY = 0

for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $c = $img.GetPixel($x, $y)
        # Brick threshold (reddish, R > 100, G < 120, B < 100)
        if ($c.R -gt 70 -and $c.G -lt 120 -and $c.R -gt $c.G * 1.5 -and $c.R -gt $c.B * 1.5) {
            if ($x -lt $brickMinX) { $brickMinX = $x }
            if ($x -gt $brickMaxX) { $brickMaxX = $x }
            if ($y -lt $brickMinY) { $brickMinY = $y }
            if ($y -gt $brickMaxY) { $brickMaxY = $y }
        }
    }
}

Write-Output "Brick bounds: X: $brickMinX to $brickMaxX, Y: $brickMinY to $brickMaxY"

# Now inside the brick bounds, let's find the logo/engraving.
# The engraving is a dark recess. So inside the brick, the pixels of the logo are darker.
# Let's find pixels where R < 90 and G < 50 and are surrounded by brick.
$logoMinX = $w
$logoMaxX = 0
$logoMinY = $h
$logoMaxY = 0

# Scan center region of the brick (e.g. within 20% to 80% of brick dimensions)
$scanMinX = $brickMinX + ($brickMaxX - $brickMinX) * 0.25
$scanMaxX = $brickMinX + ($brickMaxX - $brickMinX) * 0.75
$scanMinY = $brickMinY + ($brickMaxY - $brickMinY) * 0.25
$scanMaxY = $brickMinY + ($brickMaxY - $brickMinY) * 0.75

for ($y = $scanMinY; $y -lt $scanMaxY; $y++) {
    for ($x = $scanMinX; $x -lt $scanMaxX; $x++) {
        $c = $img.GetPixel($x, $y)
        # Check if it's the dark engraved color
        if ($c.R -lt 100 -and $c.R -gt 15) {
            if ($x -lt $logoMinX) { $logoMinX = $x }
            if ($x -gt $logoMaxX) { $logoMaxX = $x }
            if ($y -lt $logoMinY) { $logoMinY = $y }
            if ($y -gt $logoMaxY) { $logoMaxY = $y }
        }
    }
}

Write-Output "Logo bounds: X: $logoMinX to $logoMaxX, Y: $logoMinY to $logoMaxY"
Write-Output "Logo center: X: $(([math]::Floor(($logoMinX + $logoMaxX)/2))), Y: $(([math]::Floor(($logoMinY + $logoMaxY)/2)))"
Write-Output "Logo size: $($logoMaxX - $logoMinX)x$($logoMaxY - $logoMinY)"

$img.Dispose()
