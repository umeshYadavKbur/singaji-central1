import jsPDF from 'jspdf';
import ssismLogo from '../../assests/image/logoimage.png'
import './Poppins-Bold-bold'
import './Poppins-SemiBold-normal'

const downloadPdf = (data) => {


    console.log(data)
    function chunk(array, count) {
        if (count == null || count < 1) return [];
        var result = [];
        var i = 0, length = array.length;
        while (i < length) {
            result.push(Array.prototype.slice.call(array, i, i += count));
        }
        return result;
    };
    var newList = chunk(data, 10);
    // console.log(newList)
    const date = new Date()


    var doc = new jsPDF('landscape', 'px', [1366, 768]);
    var width = doc.internal.pageSize.getWidth()
    var height = doc.internal.pageSize.getHeight()
    doc.setFillColor('#F4F7FC');
    doc.rect(0, 0, width, 94, 'F')
    doc.addImage(ssismLogo, 20, 23, 150, 48)
    doc.setFontSize(26);
    doc.setFont('Poppins', 'bold')
    doc.text('Daily Report', (width / 2)-42, (94 / 2) + 5)
    
    doc.setFontSize(18);
    doc.setFont('Poppins-SemiBold', 'normal');
    doc.text(`Print Date ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`, (width)-150,  35)
    doc.text(`Session    ${' '+date.getFullYear()}-${(date.getFullYear()+1)-2000}`, (width)-150, 65)

    doc.setFillColor('#F4F7FC');
    doc.rect(0, 107, width, 57, 'F');

    const xPosition = 0;
    doc.setFont('Poppins-SemiBold', 'normal');
    doc.setFontSize(20);
    console.log(doc.getFontList())
    doc.text('S.No', xPosition + 48, 140)
    doc.text('Name', xPosition + 141, 140)
    doc.text('Father Name', xPosition + 309, 140)
    doc.text('Stream', xPosition + 525, 140)
    doc.text('Village', xPosition + 711, 140)
    doc.text('Received Amount', xPosition + 858, 140)
    doc.text('Paid Date', xPosition + 1082, 140)
    doc.text('Challan No.', xPosition + 1238, 140)

    doc.setFontSize(18);
    doc.setTextColor('#595F7E')



    let yPosition = 200;
    let H = 60;

    let page;

    let count = 1;
    newList.forEach((data, pageNO) => {
      


        if ((pageNO + 1) > 1) {
            doc.addPage();
            yPosition = 40;
            H = 60
        }

        data.forEach((ele, i) => {

            doc.text((count++).toString(), xPosition + 48 + 3, yPosition + (i * H))
            doc.text(ele.name, xPosition + 141, yPosition + (i * H))
            doc.text(ele.fathersName, xPosition + 309, yPosition + (i * H))
            doc.text((ele['stream(year)']), xPosition + 525, yPosition + (i * H))
            doc.text(ele.village, xPosition + 711, yPosition + (i * H))
            doc.text(ele.ReceivedAmount, xPosition + 858, yPosition + (i * H))
            doc.text(ele.AccountsReceiptDate, xPosition + 1082, yPosition + (i * H))
            doc.text('-', xPosition + 1238, yPosition + (i * H))


        });
    })

    doc.setFillColor('#F4F7FC');
    doc.rect(0, height-56, width, 56, 'F')
    doc.text('Copy right SSISM.ORG',(width/2)-42,height-28)

    doc.output('pdfobjectnewwindow');



}

export default downloadPdf;