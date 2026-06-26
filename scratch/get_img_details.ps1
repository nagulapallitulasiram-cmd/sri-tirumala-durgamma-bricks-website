Add-Type -AssemblyName System.Drawing

$paths = @(
    "c:\Users\Tulasi Ram\OneDrive\Documents\Desktop\Bricks\assets\premium_clay_brick.png",
    "c:\Users\Tulasi Ram\OneDrive\Documents\Desktop\Bricks\assets\premium_clay_brick_raw.png",
    "C:\Users\Tulasi Ram\.gemini\antigravity\brain\d7a71ec2-b7ea-4bcd-87ef-7d4704b14bb5\media__1780644743784.jpg",
    "C:\Users\Tulasi Ram\.gemini\antigravity\brain\d7a71ec2-b7ea-4bcd-87ef-7d4704b14bb5\media__1780644796723.png",
    "C:\Users\Tulasi Ram\.gemini\antigravity\brain\d7a71ec2-b7ea-4bcd-87ef-7d4704b14bb5\media__1780646391816.jpg",
    "C:\Users\Tulasi Ram\.gemini\antigravity\brain\d7a71ec2-b7ea-4bcd-87ef-7d4704b14bb5\.tempmediaStorage\media_d7a71ec2-b7ea-4bcd-87ef-7d4704b14bb5_1780646499030.jpg",
    "C:\Users\Tulasi Ram\.gemini\antigravity\brain\d7a71ec2-b7ea-4bcd-87ef-7d4704b14bb5\.tempmediaStorage\media_d7a71ec2-b7ea-4bcd-87ef-7d4704b14bb5_1780646516487.jpg",
    "C:\Users\Tulasi Ram\.gemini\antigravity\brain\d7a71ec2-b7ea-4bcd-87ef-7d4704b14bb5\.tempmediaStorage\media_d7a71ec2-b7ea-4bcd-87ef-7d4704b14bb5_1780852839611.jpg",
    "C:\Users\Tulasi Ram\.gemini\antigravity\brain\d7a71ec2-b7ea-4bcd-87ef-7d4704b14bb5\.tempmediaStorage\media_d7a71ec2-b7ea-4bcd-87ef-7d4704b14bb5_1780852922483.jpg",
    "C:\Users\Tulasi Ram\.gemini\antigravity\brain\d7a71ec2-b7ea-4bcd-87ef-7d4704b14bb5\.tempmediaStorage\media_d7a71ec2-b7ea-4bcd-87ef-7d4704b14bb5_1780853348270.jpg"
)

foreach ($p in $paths) {
    if (Test-Path $p) {
        try {
            $img = [System.Drawing.Image]::FromFile($p)
            Write-Output "$(Split-Path $p -Leaf): $($img.Width)x$($img.Height)"
            $img.Dispose()
        } catch {
            Write-Output "Error reading $p : $_"
        }
    } else {
        Write-Output "File does not exist: $p"
    }
}
