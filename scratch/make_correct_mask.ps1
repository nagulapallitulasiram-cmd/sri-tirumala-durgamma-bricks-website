Add-Type -AssemblyName System.Drawing

# 1. Load correct cropped logo
$src = [System.Drawing.Bitmap]::FromFile("c:\Users\Tulasi Ram\OneDrive\Documents\Desktop\Bricks\scratch\logo_cropped_correct.png")

# 2. Resize to 128x128
$resized = New-Object System.Drawing.Bitmap(128, 128)
$g = [System.Drawing.Graphics]::FromImage($resized)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($src, 0, 0, 128, 128)
$g.Dispose()
$src.Dispose()

# 3. Create mask from resized image
$w = $resized.Width
$h = $resized.Height
$dest = New-Object System.Drawing.Bitmap($w, $h)

for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $pixel = $resized.GetPixel($x, $y)
        $r = $pixel.R
        
        # Normalize the red channel between 45 and 130
        $minR = 45
        $maxR = 130
        
        $factor = ($r - $minR) / ($maxR - $minR)
        if ($factor -lt 0) { $factor = 0 }
        if ($factor -gt 1) { $factor = 1 }
        
        $smoothFactor = [math]::Pow($factor, 1.5)
        
        # Pure white for values >= 130, dark shadow color for values <= 45
        $outR = [int](255 * $smoothFactor + 65 * (1 - $smoothFactor))
        $outG = [int](255 * $smoothFactor + 30 * (1 - $smoothFactor))
        $outB = [int](255 * $smoothFactor + 20 * (1 - $smoothFactor))
        
        $dest.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $outR, $outG, $outB))
    }
}

# Save mask
$maskPath = "c:\Users\Tulasi Ram\OneDrive\Documents\Desktop\Bricks\scratch\logo_mask.png"
$dest.Save($maskPath, [System.Drawing.Imaging.ImageFormat]::Png)

$resized.Dispose()
$dest.Dispose()

# 4. Convert to Base64 and write to logo_mask_base64.txt
$bytes = [System.IO.File]::ReadAllBytes($maskPath)
$base64 = [System.Convert]::ToBase64String($bytes)
$base64Path = "c:\Users\Tulasi Ram\OneDrive\Documents\Desktop\Bricks\scratch\logo_mask_base64.txt"
Set-Content -Path $base64Path -Value $base64 -NoNewline

$size = (Get-Item $maskPath).Length
Write-Output "Successfully processed correct mask! Saved to $maskPath (size: $size bytes) and Base64 length: $($base64.Length)"
