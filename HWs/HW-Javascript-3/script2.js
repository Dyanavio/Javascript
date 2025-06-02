class ExtendedDate extends Date
{
    nextDate()
    {
        //console.log(`${this.getFullYear()} ${this.getMonth()} ${this.getDate() + 1}`);
        return new Date(this.getFullYear(), this.getMonth(), this.getDate() + 1);
    }
    isLeapYear(year)
    {
        if(!(year % 400 == year || (year % 4 != 0 && year % 100 != 0))) return true;
        return false;
    }
    isFutureOrPresent(date) // in format dd.mm.yyyy
    {
        const elements = date.split('.');
        if(date == `${this.getDay()}.${this.getMonth() + 1}.${this.getFullYear()}`) { return true; }
        if(elements[2] < this.getFullYear()) return false;
        if(elements[2] > this.getFullYear()) return true;

        if(elements[1] < this.getMonth() + 1) return false;
        if(elements[1] > this.getMonth() + 1) return true;

        if(elements[0] < this.getDay()) return false;
        if(elements[0] > this.getDay()) return true;
    }
    output()
    {
        var date = `${this.getDay()} of `;
        switch(this.getMonth() + 1)
        {
            case 1:
                date += `January`;
                break;
            case 2:
                date += `February`;
                break;
            case 3:
                date += `March`;
                break;
            case 4:
                date += `April`;
                break;
            case 5:
                date += `May`;
                break;
            case 6:
                date += `June`;
                break;
            case 7:
                date += `July`;
                break;
            case 8:
                date += `August`;
                break;
            case 9:
                date += `September`;
                break;
            case 10:
                date += `October`;
                break;
            case 1:
                date += `November`;
                break;
             case 12:
                date += `December`;
                break;
            default:
                date += `---`;  
                break;
        }

        return date;
    }
}

const board1 = document.getElementById("board1");
if(!board1) throw "Element #board1 is not accessible";

var date = new ExtendedDate();
board1.innerHTML += `Today's date: ${date.output()}<br/>`;

board1.innerHTML += `Is 15.09.2006 future date? Answer: ${date.isFutureOrPresent("15.09.2006")}<br/>`;
board1.innerHTML += `Is 15.09.2026 future date? Answer: ${date.isFutureOrPresent("15.09.2026")}<br/>`;

board1.innerHTML += `<br/>Is 2028 leap year? Answer: ${date.isLeapYear(2028)}<br/>`;
board1.innerHTML += `Is 2006 leap year? Answer: ${date.isLeapYear(2006)}<br/>`;
board1.innerHTML += `Is 2024 leap year? Answer: ${date.isLeapYear(2024)}<br/>`;
board1.innerHTML += `Is 2025 leap year? Answer: ${date.isLeapYear(2025)}<br/><br/>`;

var next = date.nextDate();
board1.innerHTML += `Next date: ${next.getDate()}.${next.getMonth() + 1}.${next.getFullYear()}`;