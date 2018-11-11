export function formatTwelveHour(time) {
	if (time <= 12) {
		if (time == 12) return formatReadableTime(Math.abs(time).toFixed(2)) + ' Pm';

		return formatReadableTime(Math.abs(time).toFixed(2)) + ' Am';
	} else {
		if (Math.abs(time - 12) <= 12) {
			if (Math.abs(time - 12) == 12) return formatReadableTime(Math.abs(time - 12).toFixed(2)) + ' Am';
			return formatReadableTime(Math.abs(time - 12).toFixed(2)) + ' Pm';
		}
		return formatTwelveHour(Math.abs(time - 24));
	}
}

export function formatTime(time) {
	const timezoneOffset = new Date().getTimezoneOffset() / 60;
	const formatedStartTime = Number(time) - timezoneOffset;
	return formatTwelveHour(formatedStartTime);
}

function formatReadableTime(time) {
	console.log(time);
	if (!time) return time;
	const newTime = time.split('.');
	return newTime[0] + ':' + (Number(newTime[1]) * .6)	;
}
