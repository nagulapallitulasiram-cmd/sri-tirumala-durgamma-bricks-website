Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Bitmap]::FromFile("c:\Users\Tulasi Ram\OneDrive\Documents\Desktop\Bricks\assets\premium_clay_brick.png")
$x = 512
for ($y = 300; $y -le 900; $y += 10) {
    $c = $img.GetPixel($x, $y)
    Write-Output "Y=$y : R=$($c.R), G=$($c.G), B=$($c.B)"
}
$img.Dispose()
