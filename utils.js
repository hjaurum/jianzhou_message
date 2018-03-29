/**
 * Created by aurum on 2018/3/17.
 */
module.exports = {
    formatDate(date){
        const d = new Date(date);
        let arr = [d.getFullYear(), (d.getMonth() + 1), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()];

        for (let i = 0; i < arr.length; i++) {
            arr[i] += '';
            if (arr.length < 2) {
                arr[i] = '0' + arr[i];
            }
        }
        return arr.join('');
    }
};