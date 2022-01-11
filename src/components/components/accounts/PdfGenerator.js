import jsPDF from 'jspdf';
import ssismLogo from '../../assests/image/logoimage.png'
import './Poppins-Bold-bold'
import './Poppins-SemiBold-normal'

const downloadPdf = (data) => {

    
    console.log(data)



    var doc = new jsPDF('landscape', 'px', [1366, 768]);
    var width = doc.internal.pageSize.getWidth()
    doc.setFillColor('#F4F7FC');
    doc.rect(0, 0, width, 94, 'F')
    doc.addImage(ssismLogo, 20, 23, 150, 48)
    doc.setFontSize(26);
    doc.setFont('Poppins', 'bold')
    doc.text('Daily Report', width / 2, (94 / 2) + 5)

    doc.setFillColor('#F4F7FC');
    doc.rect(0, 107, width, 57, 'F');

    const xPosition = 0;
    doc.setFont('Poppins-SemiBold', 'normal');
    doc.setFontSize(20);
    console.log(doc.getFontList())
    doc.text('S.No', xPosition+48, 140)
    doc.text('Name', xPosition+141, 140)
    doc.text('Father Name', xPosition+309, 140)
    doc.text('Stream', xPosition+525, 140)
    doc.text('Village', xPosition+711, 140)
    doc.text('Received Amount', xPosition+858, 140)
    doc.text('Paid Date', xPosition+1082, 140)
    doc.text('Challan No.', xPosition+1238, 140)
    
    doc.setFontSize(18);
    doc.setTextColor('#595F7E')
    const yPosition = 200;
    const H = 40;
    data.forEach((ele,i) => {
        
        doc.text((i+1).toString(), xPosition+48+3, yPosition+(i*H))
        doc.text(ele.name, xPosition+141, yPosition+(i*H))
        doc.text(ele.fathersName, xPosition+309, yPosition+(i*H))
        doc.text((ele['stream(year)']), xPosition+525, yPosition+(i*H))
        doc.text(ele.village, xPosition+711, yPosition+(i*H))
        doc.text(ele.ReceivedAmount, xPosition+858, yPosition+(i*H))
        doc.text(ele.AccountsReceiptDate, xPosition+1082, yPosition+(i*H))
        doc.text('-', xPosition+1238, yPosition+(i*H))

    });


    doc.output('pdfobjectnewwindow');



}

export default downloadPdf;