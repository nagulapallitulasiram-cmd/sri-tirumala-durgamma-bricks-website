$logPath = "C:\Users\Tulasi Ram\.gemini\antigravity\brain\d7a71ec2-b7ea-4bcd-87ef-7d4704b14bb5\.system_generated\logs\transcript.jsonl"
$lines = Get-Content -Path $logPath

# Let's find step where 6 project cards were written or modified
foreach ($line in $lines) {
    if ($line -like "*project_army_campus.png*" -and $line -like "*project_ksn_raju.png*" -and $line -like "*replace_file_content*") {
        # Parse step_index
        if ($line -match '"step_index":(\d+)') {
            Write-Output "Found matching step_index: $($Matches[1])"
            # Output first 2000 chars of the line to inspect
            Write-Output $line.Substring(0, [math]::Min(2500, $line.Length))
            Write-Output "------------------------------------------------"
        }
    }
}
