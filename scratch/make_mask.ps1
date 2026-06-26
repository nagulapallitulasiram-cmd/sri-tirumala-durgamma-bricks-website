Add-Type -AssemblyName System.Drawing
$src = [System.Drawing.Bitmap]::FromFile("c:\Users\Tulasi Ram\OneDrive\Documents\Desktop\Bricks\scratch\logo_resized.png")
$w = $src.Width
$h = $src.Height
$dest = New-Object System.Drawing.Bitmap($w, $h)

# We will map pixels based on their Red value
# Red values range from ~40 (deep engraving) to ~170 (brick surface)
for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $pixel = $src.GetPixel($x, $y)
        $r = $pixel.R
        
        # Normalize the red channel between 45 and 130
        $minR = 45
        $maxR = 130
        
        $factor = ($r - $minR) / ($maxR - $minR)
        if ($factor -lt 0) { $factor = 0 }
        if ($factor -gt 1) { $factor = 1 }
        
        # Output color: interpolate between dark shadow (e.g., R=70, G=35, B=25) and white (R=255, G=255, B=255)
        # We also smooth the factor to remove noise
        $smoothFactor = [math]::Pow($factor, 1.5)
        
        $outR = [int](255 * $smoothFactor + 65 * (1 - $smoothFactor))
        $outG = [int](255 * $smoothFactor + 30 * (1 - $smoothFactor))
        $outB = [int](255 * $smoothFactor + 20 * (1 - $smoothFactor))
        
        $dest.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $outR, $outG, $outB))
    }
}

$dest.Save("c:\Users\Tulasi Ram\OneDrive\Documents\Desktop\Bricks\scratch\logo_mask.png", [System.Drawing.Imaging.ImageFormat]::Png)

$src.Dispose()
$dest.Dispose()

$size = (Get-Item "c:\Users\Tulasi Ram\OneDrive\Documents\Desktop\Bricks\scratch\logo_mask.png").Length
Write-Output "Mask logo saved to scratch/logo_mask.png (size: $size bytes)"
