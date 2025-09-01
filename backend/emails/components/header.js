const renderButton = require("./oys-button");

function renderHeaderBlock(url) {
    return `
        <div class="block1" styles="background: url('${url}/emails/bg1.jpg');">
            <table class="table1">
                <tbody colspan="2">
                    <tr class="tr">
                        <td class="td">
                            <p class="text">WELCOME TO <br/> OYS STUDIO</p>
                        </td>
                        <td class="td">
                            <img src="${url}/emails/logo.png" alt="logo" class="logo"/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="block2" style="text-align: center;background: url('${url}/emails/bg2.jpg');">
            <table class="textTable" role="presentation" width="100%">
                <tr><td align="center"><p class="textHeader">Let your ideas sing</p></td></tr>
                <tr><td align="center"><p class="text">Create your order and...</p></td></tr>
                <tr>
                    <td align="center">
                        ${renderButton(`${url}/form?plan=silver`, "Own Your Song")}
                    </td>
                </tr>
            </table>
        </div>
    `;
}
  
module.exports = renderHeaderBlock;