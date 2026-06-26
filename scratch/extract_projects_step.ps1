$logPath = "C:\Users\Tulasi Ram\.gemini\antigravity\brain\d7a71ec2-b7ea-4bcd-87ef-7d4704b14bb5\.system_generated\logs\transcript.jsonl"
$lines = Get-Content -Path $logPath

# Look for step 204 line (which has index 200 in 0-indexed array)
$line = $lines[200]
if ($line -like "*Aganampudi Cancer Hospital*") {
    # Let's search inside this JSON line for the projects section.
    # The projects section starts with "<!-- OUR PROJECTS: Integrated Visual Cards -->"
    # and ends before "<!-- GALLERY" or similar.
    $targetStart = "<!-- OUR PROJECTS:"
    $idx = $line.IndexOf($targetStart)
    if ($idx -ge 0) {
        Write-Output "Found projects section in log!"
        $sub = $line.Substring($idx, 4000)
        Write-Output $sub
    } else {
        Write-Output "Could not find '<!-- OUR PROJECTS:' text in line 201."
    }
} else {
    Write-Output "Line 201 does not contain Cancer Hospital"
}
