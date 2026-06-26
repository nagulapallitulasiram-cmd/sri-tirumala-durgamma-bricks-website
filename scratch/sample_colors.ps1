Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Bitmap]::FromFile("c:\Users\Tulasi Ram\OneDrive\Documents\Desktop\Bricks\assets\premium_clay_brick.png")

$points = @(
    [Drawing.Point]::new(10, 10),
    [Drawing.Point]::new(512, 10),
    [Drawing.Point]::new(1010, 10),
    [Drawing.Point]::new(10, 512),
    [Drawing.Point]::new(512, 512),
    [Drawing.Point]::new(1010, 512),
    [Drawing.Point]::new(10, 1010),
    [Drawing.Point]::new(512, 1010),
    [Drawing.Point]::new(1010, 1010)
)

foreach ($p in $points) {
    $c = $img.GetPixel($p.X, $p.Y)
    Write-Output "Pixel ($($p.X), $($p.Y)): R=$($c.R), G=$($c.G), B=$($c.B), A=$($c.A)"
}

$img.Dispose()
