Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Bitmap]::FromFile("c:\Users\Tulasi Ram\OneDrive\Documents\Desktop\Bricks\assets\premium_clay_brick.png")

$points = @(
    [Drawing.Point]::new(400, 450),
    [Drawing.Point]::new(450, 400),
    [Drawing.Point]::new(600, 500),
    [Drawing.Point]::new(500, 600),
    [Drawing.Point]::new(350, 550)
)

foreach ($p in $points) {
    $c = $img.GetPixel($p.X, $p.Y)
    Write-Output "Pixel ($($p.X), $($p.Y)): R=$($c.R), G=$($c.G), B=$($c.B), Hex=#$($c.R.ToString('X2'))$($c.G.ToString('X2'))$($c.B.ToString('X2'))"
}
$img.Dispose()
