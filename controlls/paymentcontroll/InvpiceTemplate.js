export const InvoiceTemplate= (invoice) => {
    const today = new Date();
  
    return `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Invoice</title>
          <style>
            .invoice-box {
              max-width: 800px;
              margin: auto;
              padding: 30px;
              border: 1px solid #eee;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
              font-size: 16px;
              line-height: 24px;
              font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
              color: #555;
            }
            .margin-top {
              margin-top: 50px;
            }
            .justify-center {
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="invoice-box">
            <table cellpadding="0" cellspacing="0">
              <tr class="top">
                <td colspan="2">
                  <table>
                    <tr>
                      <td class="title">
                        <img src="https://www.sparksuite.com/images/logo.png" style="width:100%; max-width:300px;">
                      </td>
                      <td>
                        Date: ${`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr class="information">
                <td colspan="2">
                  <table>
                    <tr>
                      <td>
                        Customer name:<br>
                        ${invoice.name}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr class="heading">
                <td>Item</td>
                <td>Price</td>
              </tr>
          
            kalaisurya
              <tr class="total">
                <td></td>
                <td>Total: ${invoice.total}</td>
              </tr>
            </table>
          </div>
        </body>
      </html>
    `;
  };
  