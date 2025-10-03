export function formatDuration(seconds: number): string {
	const days = Math.floor(seconds / (24 * 3600));
	seconds %= 24 * 3600;
	const hours = Math.floor(seconds / 3600);
	seconds %= 3600;
	const minutes = Math.floor(seconds / 60);
	seconds %= 60;

	const parts: string[] = [];

	if (days > 0) parts.push(`${days} ${days === 1 ? "Day" : "Days"}`);
	if (hours > 0) parts.push(`${hours} ${hours === 1 ? "Hour" : "Hours"}`);
	if (minutes > 0) parts.push(`${minutes} ${minutes === 1 ? "Minute" : "Minutes"}`);
	if (seconds > 0 || parts.length === 0) parts.push(`${seconds} ${seconds === 1 ? "Second" : "Seconds"}`);

	return parts.join(" , ");
}
