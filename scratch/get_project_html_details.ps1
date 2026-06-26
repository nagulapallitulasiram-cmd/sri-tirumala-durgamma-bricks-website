$logPath = "C:\Users\Tulasi Ram\.gemini\antigravity\brain\d7a71ec2-b7ea-4bcd-87ef-7d4704b14bb5\.system_generated\logs\transcript.jsonl"
$lines = Get-Content -Path $logPath

# Let's read step 834 or find the step containing replace_file_content for projects
$stepIdx = 834
if ($lines.Length -ge $stepIdx) {
    $line = $lines[$stepIdx - 1]
    # Find index of project_ksn_raju.png
    $idx = $line.IndexOf("project_ksn_raju.png")
    if ($idx -ge 0) {
        Write-Output "Found in line $stepIdx!"
        $start = [math]::Max(0, $idx - 500)
        $len = [math]::Min(4000, $line.Length - $start)
        Write-Output $line.Substring($start, $len)
    } else {
        Write-Output "Not found in line $stepIdx"
    }
}
