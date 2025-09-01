import React, { useEffect } from 'react';
import styles from './TermsAndConditions.module.scss';

function TermsAndConditions() {
  const setPageHeight = () => {
    const footer = document.querySelector("footer");
    const container = document.querySelector(`.${styles.container}`);

    if (footer && container) {
      const footerHeight = footer.offsetHeight || 0;
      container.style.minHeight = `calc(100vh - ${footerHeight}px)`;
      container.style.height = `100%`;
    }
  };

  useEffect(() => {
    setPageHeight();
    window.addEventListener("resize", setPageHeight);

    return () => window.removeEventListener("resize", setPageHeight);
  }, []);

  
  return (
    <div className={styles.container}>
      <div className={styles.ctn}>
        <p className={styles.tacHeader}>Terms of Use</p>

        <ol className={styles.tacList}>
          <li className={styles.tacListItem}>
            <p className={styles.tacListItemHeader}>Acceptance & Beta Version Disclaimer</p>
            <div className={styles.tacListItemText}>
              <p>The Own Your Song website (<a href='/' className={styles.tacLink}>ownyoursong.com</a>) is currently operating as a beta-version, intended solely for testing, feedback, and initial market validation. Services at this stage are provided by Ivan Mykhailenko as an individual, pending the official registration of Own Your Song Studio OÜ in Estonia.</p>

              <p>By using this website during the beta period, you understand and explicitly agree that:
              - The website may contain bugs, errors, or functional issues.<br/>
              - Transactions and payments are currently processed securely via Stripe on behalf of Ivan Mykhailenko personally.<br/>
              - Upon official registration of Own Your Song Studio OÜ, your transaction history, and personal data will be transferred to Own Your Song Studio OÜ, and you explicitly consent to such data transfer by continuing to use the website.<br/>
              </p>

              <p>All references to "Own Your Song Studio OÜ," "Company," "we," or "us" in these Terms currently refer to Ivan Mykhailenko individually until the legal entity is officially registered.</p>

              <p>If you disagree with these conditions, please refrain from using the website until the company is officially registered.</p>

              <p>These Terms constitute a binding agreement governing your use of the <a href='/' className={styles.tacLink}>ownyoursong.com</a> website and related social media profiles ("Website"). By using the Website, you signify your assent to these Terms and our Privacy Policy.</p>
            </div>
            <hr/>
          </li>

          <li className={styles.tacListItem}>
            <p className={styles.tacListItemHeader}>Website Access</p>
            <div className={styles.tacListItemText}>
              <p>Own Your Song grants permission to use the Website under the following conditions: </p>
              <ul className={styles.tacSubList}>
                <li className={styles.tacSubListItem}>Solely for your personal, non-commercial use.</li>
                <li className={styles.tacSubListItem}>No copying or distribution without prior written consent from Own Your Song.</li>
                <li className={styles.tacSubListItem}>No unauthorized alterations or modifications of website content.</li>
              </ul>

              <p>Automated systems ("robots," "spiders," etc.) are prohibited without prior written consent. Public search engines have limited permission solely for indexing purposes.</p>

              <p>Collecting or misusing personal information for commercial purposes is strictly forbidden.</p>
            </div>
            <hr/>
          </li>

          <li className={styles.tacListItem}>
            <p className={styles.tacListItemHeader}>Third-party Websites</p>
            <div className={styles.tacListItemText}>
              <p>The Website may contain external links. Own Your Song is not responsible for third-party content, privacy policies, or practices. Your interaction with third-party websites is entirely at your own risk.</p>
            </div>
            <hr/>
          </li>

          <li className={styles.tacListItem}>
            <p className={styles.tacListItemHeader}>Intellectual Property Rights</p>
            <div className={styles.tacListItemText}>
              <p>Content created by Own Your Song (text, graphics, photos, audio, interactive features, trademarks, service marks, logos, "Content") is owned or licensed by Own Your Song, protected by Estonian, EU, and international intellectual property laws. You agree not to use, copy, distribute, sell, license, broadcast or exploit Content without prior written consent from Own Your Song.</p>
            </div>
            <hr/>
          </li>

          <li className={styles.tacListItem}>
            <p className={styles.tacListItemHeader}>Rights to Deliverables under B2B Services</p>
            <div className={styles.tacListItemText}>
              <p>When placing an order through the B2B section of our website and upon full payment, you are automatically granted by Ivan Mykhailenko (acting individually during beta) a non-exclusive (limited) license to use the created product. This license permits commercial use but explicitly prohibits resale, sublicensing, gifting, distribution, or transfer to third parties. This limited license is granted without territorial restrictions.</p>

              <p>Ivan Mykhailenko (temporarily until company registration) retains ownership of all intellectual property rights and explicitly reserves the right to showcase, reproduce, and publicly display the delivered product in full or partially, for demonstration and portfolio purposes.</p>

              <p>Upon official registration of Own Your Song Studio OÜ, all rights and obligations specified herein will automatically transfer to Own Your Song Studio OÜ.</p>
            </div>
            <hr/>
          </li>

          <li className={styles.tacListItem}>
            <p className={styles.tacListItemHeader}>User Submissions</p>
            <div className={styles.tacListItemText}>
              <p>Own Your Song does not assume responsibility for user-submitted content (text, images, audio, videos, etc.) nor endorses or guarantees its accuracy or quality. You accept all risks associated with reliance on user-submitted content.</p>

              <p>You retain ownership of your user-submitted content but grant Own Your Song a license to display and use it on the Website. Own Your Song reserves the right to remove any content or terminate user access at its discretion without prior notice.</p>
            </div>
            <hr/>
          </li>

          <li className={styles.tacListItem}>
            <p className={styles.tacListItemHeader}> Rules of Conduct</p>
            <div className={styles.tacListItemText}>
              <p>Prohibited user-submitted content includes:</p>

              <ul className={styles.tacSubList}>
                <li className={styles.tacSubListItem}>Defamatory, illegal, explicit, or plagiarized materials.</li>
                <li className={styles.tacSubListItem}>Violating intellectual property rights or confidentiality agreements.</li>
                <li className={styles.tacSubListItem}>Harassing, threatening, offensive, harmful, obscene, or otherwise inappropriate content.</li>
                <li className={styles.tacSubListItem}>Content breaching privacy rights, containing hate speech, or promoting unlawful acts.</li>
                <li className={styles.tacSubListItem}>Content promoting spam, viruses, or malicious software.</li>
              </ul>

              <p>Misrepresentation, unauthorized alterations, or soliciting personal information from minors is prohibited.</p>
            </div>
            <hr/>
          </li>

          <li className={styles.tacListItem}>
            <p className={styles.tacListItemHeader}>Copyright Infringement</p>
            <div className={styles.tacListItemText}>
              <p>Own Your Song respects intellectual property rights and expects users to do the same. Unauthorized use or distribution of copyrighted material without explicit consent is prohibited.</p>

              <p>To report infringement, submit a notice containing the following:</p>

              <ul className={styles.tacSubList}>
                <li className={styles.tacSubListItem}>Authorized signature.</li>
                <li className={styles.tacSubListItem}>Identification of infringed work.</li>
                <li className={styles.tacSubListItem}>Identification of infringing material and sufficient location details (URLs).</li>
                <li className={styles.tacSubListItem}>Your contact information (address, telephone, email).</li>
                <li className={styles.tacSubListItem}>A statement of a good-faith belief of infringement and accuracy of the provided information.</li>
              </ul>

              <p>Send notices to:</p>
              
              <p>Ivan Mykhailenko (Own Your Song, pending registration) <br/>
                Tartu maakond, Tartu, Estonia <br/>
                Email: <a href='mailto:ownyoursongstudio@gmail.com '>ownyoursongstudio@gmail.com</a><br/>
              </p>

              <p>False claims may lead to liability under EU and Estonian laws.</p>
            </div>
            <hr/>
          </li>

          <li className={styles.tacListItem}>
            <p className={styles.tacListItemHeader}>Modifications to the Website</p>
            <div className={styles.tacListItemText}>
              <p>Own Your Song reserves the right to modify or discontinue the Website temporarily or permanently without liability to users or third parties.</p>
            </div>
            <hr/>
          </li>

          <li className={styles.tacListItem}>
            <p className={styles.tacListItemHeader}>Payment Terms (Fees, Stripe)</p>
            <div className={styles.tacListItemText}>
              <p>During the beta-test period, all transactions and payments will be processed by Stripe and are accepted by an individual, pending the official registration of Own Your Song Studio OÜ. By initiating any transaction during this beta period, you explicitly acknowledge and accept these conditions.</p>

              <p>Fees:<br/>Fees are stated in Euros (€). You agree to pay applicable fees and charges in accordance with payment terms at purchase time. Transactions are processed securely through Stripe; we do not store full payment details.</p>

              <p>You acknowledge immediate commencement of services upon purchase, thereby waiving rights to withdrawal under Estonian and EU consumer protection laws upon artist acceptance. If Own Your Song cannot fulfill your order, refunds or credit may be provided at our discretion.</p>

              <p>Revisions, if permitted, follow guidelines outlined on our Website.</p>
            </div>
            <hr/>
          </li>

          <li className={styles.tacListItem}>
            <p className={styles.tacListItemHeader}>Warranty Disclaimer</p>
            <div className={styles.tacListItemText}>
              <p>You use the Website at your sole risk. Own Your Song provides the Website "AS IS" without warranties of accuracy, completeness, or fitness for particular purposes. Own Your Song disclaims liability for inaccuracies, injuries, unauthorized access, interruptions, malware, or losses from website usage.</p>

              <p>We bear no responsibility for third-party websites linked from Own Your Song.</p>
            </div>
            <hr/>
          </li>

          <li className={styles.tacListItem}>
            <p className={styles.tacListItemHeader}>Limitation of Liability</p>
            <div className={styles.tacListItemText}>
              <p>Own Your Song and its affiliates, officers, employees, licensors, and agents disclaim liability for direct, indirect, incidental, special, punitive, or consequential damages arising from Website use, content errors, personal injury, unauthorized access, service interruptions, malware, or illegal third-party actions. Liability limitations apply fully under applicable Estonian and EU law</p>

              <p>The Website operates from Estonia. Own Your Song does not guarantee appropriateness or compliance with jurisdictions outside Estonia or the EU.</p>
            </div>
            <hr/>
          </li>

          <li className={styles.tacListItem}>
            <p className={styles.tacListItemHeader}>Indemnity</p>
            <div className={styles.tacListItemText}>
              <p>You agree to indemnify and hold Own Your Song, its subsidiaries, affiliates, employees, directors, officers, licensors, and agents harmless from claims, damages, losses, liabilities, costs, or expenses (including legal fees) arising from your violation of these Terms or your misuse of the Website or any infringement by your user submissions.</p>
            </div>
            <hr/>
          </li>

          <li className={styles.tacListItem}>
            <p className={styles.tacListItemHeader}>Ability to Accept Terms</p>
            <div className={styles.tacListItemText}>
              <p>Using Own Your Song services, you affirm that you are at least 18 years old, an emancipated minor, or have parental consent. The Website is not intended for children under 13; such users are prohibited from using the Website.</p>
            </div>
            <hr/>
          </li>

          <li className={styles.tacListItem}>
            <p className={styles.tacListItemHeader}>Assignment</p>
            <div className={styles.tacListItemText}>
              <p>You may not assign or transfer your rights under these Terms without prior written consent from Own Your Song. We may freely assign our rights and obligations under these Terms.</p>
            </div>
            <hr/>
          </li>

          <li className={styles.tacListItem}>
            <p className={styles.tacListItemHeader}>Copyright Notice</p>
            <div className={styles.tacListItemText}>
              <p>Website © 2025 Own Your Song Studio OÜ (pending registration). Currently provided by Ivan Mykhailenko individually. All rights reserved. Any unauthorized use, copying, or distribution is strictly prohibited.</p>
            </div>
            <hr/>
          </li>

          <li className={styles.tacListItem}>
            <p className={styles.tacListItemHeader}>Trademarks</p>
            <div className={styles.tacListItemText}>
              <p>All trademarks related to Own Your Song belong exclusively to Ivan Mykhailenko (pending registration of Own Your Song Studio OÜ). Unauthorized use is strictly prohibited without prior written permission.</p>
            </div>
            <hr/>
          </li>

          <li className={styles.tacListItem}>
            <p className={styles.tacListItemHeader}>Violations</p>
            <div className={styles.tacListItemText}>
              <p>Report violations or objectionable content to <a href='mailto:ownyoursongstudio@gmail.com '>ownyoursongstudio@gmail.com</a>.</p>
            </div>
            <hr/>
          </li>

          <li className={styles.tacListItem}>
            <p className={styles.tacListItemHeader}>Governing Law</p>
            <div className={styles.tacListItemText}>
              <p>These Terms are governed by and construed under Estonian and EU laws. Any disputes arising from use of the Website shall fall under the jurisdiction of courts located in Tartu, Estonia.</p>
            </div>
            <hr/>
          </li>

          <li className={styles.tacListItem}>
            <p className={styles.tacListItemHeader}>Updates</p>
            <div className={styles.tacListItemText}>
              <p>These Terms may be updated without prior notice. Your continued Website use constitutes acceptance of the updated Terms.</p>
            </div>
            <hr/>
          </li>
        </ol>

        <p className={styles.lastUpdateText}>Last updated: April 1, 2025</p>
      </div>
    </div>
  )
}

export default TermsAndConditions