export function formatDate(date: Date): string {
	const month = '' + (date.getMonth() + 1),
		day = '' + date.getDate(),
		year = '' + date.getFullYear();
	const hours = '' + date.getHours(),
		minutes = '' + date.getMinutes(),
		seconds = '' + date.getSeconds();
	const dateString = [year, month, day].join('-');
	const timeString = [hours, minutes, seconds].join(':');
	return dateString + 'T' + timeString + 'Z';
}
