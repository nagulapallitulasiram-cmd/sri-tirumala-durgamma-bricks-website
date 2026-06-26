Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Bitmap]::FromFile("c:\Users\Tulasi Ram\OneDrive\Documents\Desktop\Bricks\assets\premium_clay_brick.png")
$y = 500
for ($x = 100; $x -le 900; $x += 10) {
    $c = $img.GetPixel($x, $y)
    Write-Output "X=$x : R=$($c.R), G=$($c.G), B=$($c.B)"
}
$img.Dispose()
