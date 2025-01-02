//判断当前时间是否在营业时间中
export default function(openTime, closeTime) {
    const currentDate = new Date();
    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();

    const openHours = openTime[0];
    const openMinutes = openTime[1];
    const closeHours = closeTime[0];
    const closeMinutes = closeTime[1];

    // 将当前时间转换为分钟数表示，方便比较
    const currentTotalMinutes = currentHours * 60 + currentMinutes;
    const openTotalMinutes = openHours * 60 + openMinutes;
    const closeTotalMinutes = closeHours * 60 + closeMinutes;

    return currentTotalMinutes >= openTotalMinutes && currentTotalMinutes <= closeTotalMinutes;
}
