Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Bitmap]::FromFile("c:\Users\Tulasi Ram\OneDrive\Documents\Desktop\Bricks\assets\premium_clay_brick_raw.png")
$w = $img.Width
$h = $img.Height
$gridSize = 30
$stepX = [Math]::Floor($w / $gridSize)
$stepY = [Math]::Floor($h / $gridSize)

for ($y = 0; $y -lt $gridSize; $y++) {
    $line = ""
    for ($x = 0; $x -lt $gridSize; $x++) {
        $px = $x * $stepX
        $py = $y * $stepY
        if ($px -lt $w -and $py -lt $h) {
            $c = $img.GetPixel($px, $py)
            if ($c.R -gt 50 -and $c.R -gt $c.G * 1.3) {
                $line += "#"
            } elseif ($c.R -gt 30 -and $c.G -gt 30 -and $c.B -gt 30) {
                $line += "."
            } else {
                $line += " "
            }
        }
    }
    Write-Output $line
}
$img.Dispose()
