import React, { useEffect } from 'react';
import styles from './Privacy.module.scss';

function Privacy() {
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
        <p className={styles.prHeader}>Privacy Policy</p>
        <p className={styles.prSubHeader}>Own Your Song Studio OÜ</p>

        <p className={styles.lastUpdateText}>Last updated: April 1, 2025</p>

        <ol className={styles.prList}>
          <li className={styles.prListItem}>
            <p className={styles.prListItemHeader}>Beta Testing Disclaimer</p>
            <div className={styles.prListItemText}>
              <p>Please note, the website <a href='/' className={styles.prLink}>ownyoursong.com</a> and its services are currently in beta-testing phase. Services at this stage are provided by an individual, Ivan Mykhailenko (acting as a private individual), pending the official registration of Own Your Song Studio OÜ in Estonia. All references in this Privacy Policy to "Own Your Song Studio OÜ," "Company," "we," or "us" currently pertain to Ivan Mykhailenko personally until the legal entity is officially registered. Upon the official establishment of Own Your Song Studio OÜ, responsibility for collected data will be transferred accordingly, and users explicitly agree to this data transfer by using the service during beta testing.</p>
            </div>
            <hr/>
          </li>

          <li className={styles.prListItem}>
            <p className={styles.prListItemHeader}>Contact Information (During Beta)</p>
            <div className={styles.prListItemText}>
              <p>Ivan Mykhailenko (individual providing services) Temporary Contact Address: Tartu maakond, Tartu, Estonia <br/>
                Phone: <a href="tel:+34632711045">+34632711045</a><br/>
                Email: <a href="mailto:ownyoursongstudio@gmail.com">ownyoursongstudio@gmail.com</a> <br/>
                Temporary Data Protection Contact (GDPR): Ruslan Kleister, <a href="mailto:ownyoursongstudio@gmail.com">ownyoursongstudio@gmail.com</a> <br/>
                (Official registration of Own Your Song Studio OÜ is pending. After registration, contact details will be updated accordingly.)
              </p>
            </div>
            <hr/>
          </li>
        </ol>

        <p className={styles.prHeader}>Information We Collect:</p>

        <ol className={styles.prList}>
          <li className={styles.prListItem}>
            <p className={styles.prListItemHeader}>Non-Personal Information:</p>
            <div className={styles.prListItemText}>
              <p> When you use our website or Services, we automatically collect aggregated non-identifiable data, including device type, IP address, operating system, browser type, pages viewed, date/time stamps, and other related analytics data.</p>
            </div>
            <hr/>
          </li>

          <li className={styles.prListItem}>
            <p className={styles.prListItemHeader}>Personal Information Collected:</p>
            <div className={styles.prListItemText}>
              <p> We collect information you voluntarily provide, including but not limited to:</p>
              <ul className={styles.prSubList}>
                <li className={styles.prSubListItem}>Name, email address, phone number, and mailing address.</li>
                <li className={styles.prSubListItem}>Payment information processed securely via Stripe.</li>
                <li className={styles.prSubListItem}>Responses, preferences, and personal stories or details provided for creating custom AI-generated or human-produced musical compositions and recordings ("Songs").</li>
                <li className={styles.prSubListItem}>Content breaching privacy rights, containing hate speech, or promoting unlawful acts.</li>
                <li className={styles.prSubListItem}>Additional details relevant to your preferences and requests.</li>
              </ul>
            </div>
            <hr/>
          </li>

          <li className={styles.prListItem}>
            <p className={styles.prListItemHeader}>Use of Information:</p>
            <div className={styles.prListItemText}>
              <p>We may use your information for:</p>
              <ul className={styles.prSubList}>
                <li className={styles.prSubListItem}>Providing, maintaining, and improving our services.</li>
                <li className={styles.prSubListItem}>Processing your orders and managing transactions.</li>
                <li className={styles.prSubListItem}>Customer support, inquiries, and service-related notifications.</li>
                <li className={styles.prSubListItem}>Marketing communications, promotional offers, newsletters, and updates (opt-out available).</li>
                <li className={styles.prSubListItem}>Analyzing usage trends to enhance user experience.</li>
                <li className={styles.prSubListItem}>Detecting, investigating, and preventing fraud or unauthorized activities.</li>
              </ul>
            </div>
            <hr/>
          </li>
        </ol>

        <p className={styles.prHeader}>Processing of Payments:</p>

        <ol className={styles.prList}>
          <li className={styles.prListItem}>
            <p className={styles.prListItemHeader}>Payments and Transactions (Beta Stage):</p>
            <div className={styles.prListItemText}>
              <p>Currently, payments are securely processed via Stripe on behalf of an individual (Ivan Mykhailenko), pending the official registration of Own Your Song Studio OÜ. By using the service during this beta-testing phase, you explicitly acknowledge and agree that transactions are conducted with a private individual.</p>
            </div>
            <hr/>
          </li>

          <li className={styles.prListItem}>
            <p className={styles.prListItemHeader}>Data Storage:</p>
            <div className={styles.prListItemText}>
              <p>Personal data is securely stored and managed using MongoDB, with strict security protocols to prevent unauthorized access.</p>
            </div>
            <hr/>
          </li>

          <li className={styles.prListItem}>
            <p className={styles.prListItemHeader}>Age Restrictions:</p>
            <div className={styles.prListItemText}>
              <p>Our services are intended exclusively for users aged 18 and older. We do not knowingly collect or process personal information from users under 18 years of age.</p>
            </div>
            <hr/>
          </li>

          <li className={styles.prListItem}>
            <p className={styles.prListItemHeader}>Intellectual Property and Content Ownership:</p>
            <div className={styles.prListItemText}>
              <p>You maintain ownership of any personal information and original content provided by you ("Story"). Own Your Song Studio retains all ownership and intellectual property rights of musical compositions, recordings, and generated works until explicitly agreed otherwise. Customers receive rights to use purchased songs for personal, non-commercial purposes, unless specific licensing agreements state otherwise. (Notwithstanding the foregoing, Company may use, distribute and publish the Song in its sole discretion.) Currently, during beta phase, intellectual property rights are owned by Ivan Mykhailenko pending official company registration. Upon company registration, ownership automatically transfers to Own Your Song Studio OÜ.</p>
            </div>
            <hr/>
          </li>

          <li className={styles.prListItem}>
            <p className={styles.prListItemHeader}>Online Survey Data:</p>
            <div className={styles.prListItemText}>
              <p>We may periodically conduct voluntary user surveys. We encourage our users to participate in such surveys because they provide us with important information regarding the improvement of the Services. You may also volunteer for certain surveys that we may offer to our users, and any additional rules regarding the conduct of such surveys will be disclosed to you prior to your participation. We do not link the survey responses to any Personal Information, and all responses are anonymous.</p>
            </div>
            <hr/>
          </li>

          <li className={styles.prListItem}>
            <p className={styles.prListItemHeader}>Information Regarding Your Friends:</p>
            <div className={styles.prListItemText}>
              <p>We encourage you to refer a friend to the Website and Services by sending us a friend’s name and email address. We will keep this information in our database, and send that person a one-time e-mail containing your name and inviting them to visit the Website. This e-mail will also include instructions on how to remove their information from our database. You agree that you will not abuse this feature by entering names and addresses of those who would not be interested in the Services.</p>
            </div>
            <hr/>
          </li>

          <li className={styles.prListItem}>
            <p className={styles.prListItemHeader}>Information About You We May Obtain Through Other Sources:</p>
            <div className={styles.prListItemText}>
              <p>Company may also receive Personal Information provided by affiliated partners or third parties in the course of your using their services, or from third parties subject to the limitations of the privacy policies of those affiliated partners or third parties.</p>
            </div>
            <hr/>
          </li>

          <li className={styles.prListItem}>
            <p className={styles.prListItemHeader}>Cookies and Tracking Technologies:</p>
            <div className={styles.prListItemText}>
              <p>We use cookies and similar technologies to optimize functionality and track site usage analytics. You can configure your browser settings to reject cookies; however, this may impact website performance and user experience.</p>
            </div>
            <hr/>
          </li>

          <li className={styles.prListItem}>
            <p className={styles.prListItemHeader}>Usage Tracking:</p>
            <div className={styles.prListItemText}>
              <p>Company may also use data collection tags or directives such as “pixel tags,” “clear gifs,” Javascript scripts, API calls, or similar means (individually or collectively, “Usage Tracking”) and the demographic or psychographic data we have collected, and with third-party analysis partners, to analyze usage patterns of users anonymously and to serve promotional material to you that are tailored based on the analysis of what Company believes you would respond favorably to in light of the information that Company has collected or accessed about you as described above. A “pixel tag” is a small, electronic image, often a single pixel and often transparent, that is placed on a web page and may be associated with cookies on your hard drive. We do not link the Usage Tracking to any Personal Information.</p>
            </div>
            <hr/>
          </li>

          <li className={styles.prListItem}>
            <p className={styles.prListItemHeader}>GDPR Compliance</p>
            <div className={styles.prListItemText}>
              <p>The General Data Protection Regulation ("GDPR") provides certain rights concerning your personal data. Own Your Song respects these rights, including:</p>

              <ul className={styles.prSubList}>
                <li className={styles.prSubListItem}>Right of Access</li>
                <li className={styles.prSubListItem}>Right to Rectification</li>
                <li className={styles.prSubListItem}>Right to Erasure</li>
                <li className={styles.prSubListItem}>Right to Restriction</li>
                <li className={styles.prSubListItem}>Right to Object</li>
                <li className={styles.prSubListItem}>Right to Data Portability</li>
                <li className={styles.prSubListItem}>Right not to be subject to Automated Decision-making</li>
              </ul>

              <p>To exercise these rights or opt-out from data collection, please contact our temporary Data Protection Contact during beta testing: Ruslan Kleister, <a href="mailto:ownyoursongstudio@gmail.com">ownyoursongstudio@gmail.com</a></p>

              <p>If you are unsatisfied with how we handle your data, you may contact and lodge a complaint with the Estonian Data Protection Inspectorate (Andmekaitse Inspektsioon) or your local supervisory authority.</p>
            </div>
            <hr/>
          </li>

          <li className={styles.prListItem}>
            <p className={styles.prListItemHeader}>Business Transfers:</p>
            <div className={styles.prListItemText}>
              <p>As we are currently operating in beta as an individual provider (Ivan Mykhailenko), a business transfer will only become relevant once the official legal entity (Own Your Song Studio OÜ) is established. Upon such registration, your personal information and transaction data will be officially transferred to Own Your Song Studio OÜ, and you explicitly consent to such transfer by continuing use during beta-testing.</p>
            </div>
            <hr/>
          </li>

          <li className={styles.prListItem}>
            <p className={styles.prListItemHeader}>Discussion Thread:</p>
            <div className={styles.prListItemText}>
              <p>Our discussion thread is made available to users and visitors of the Website and may contain postings and comments related to a Song. Any information that is disclosed in the comments section of the discussion thread becomes public information and you should exercise caution when deciding to disclose any Personal Information.</p>
            </div>
            <hr/>
          </li>

          <li className={styles.prListItem}>
            <p className={styles.prListItemHeader}>Third-party Links:</p>
            <div className={styles.prListItemText}>
              <p>Our website may contain links to third-party websites or services. This Privacy Policy does not cover such third-party entities. We encourage you to review their privacy policies before interacting with these services.</p>
            </div>
            <hr/>
          </li>

          <li className={styles.prListItem}>
            <p className={styles.prListItemHeader}>Account Information:</p>
            <div className={styles.prListItemText}>
              <p>If you are a registered user of our Services, we provide you with tools and account settings to access or modify the Personal Information you provided to us and associated with your account. You can also permanently delete your account. If send a termination notice to ownyoursongstudio@gmail.com your account will be deactivated and then deleted. For up to thirty (30) days after deactivation it is still possible to restore your account if it was accidentally or wrongfully deactivated. After thirty (30) days, we begin the process of deleting your account from our systems.</p>
            </div>
            <hr/>
          </li>

          <li className={styles.prListItem}>
            <p className={styles.prListItemHeader}>Email and Telephone Communications:</p>
            <div className={styles.prListItemText}>
              <p>We require an email address for registration and transactions. We may send transactional and promotional emails (you may unsubscribe at any time). Additionally, we may contact you via telephone or SMS regarding orders or support queries. To opt out, contact us at <a href="mailto:ownyoursongstudio@gmail.com ">ownyoursongstudio@gmail.com </a> or use provided unsubscribe mechanisms.</p>
            </div>
            <hr/>
          </li>

          <li className={styles.prListItem}>
            <p className={styles.prListItemHeader}>Changes to This Privacy Policy:</p>
            <div className={styles.prListItemText}>
              <p>We reserve the right to modify this Privacy Policy periodically. Updates will be clearly indicated by revising the date at the top of this document. We encourage regular review of our policy.</p>
            </div>
            <hr/>
          </li>

          <li className={styles.prListItem}>
            <p className={styles.prListItemHeader}>Security Measures:</p>
            <div className={styles.prListItemText}>
              <p>We implement comprehensive security practices, including encryption, SSL technology, and secure databases, to protect your data. Nonetheless, transmission of information via the internet is never entirely secure; thus, absolute security cannot be guaranteed.</p>

              <p>For questions, updates, or concerns about this Privacy Policy, please contact us at: <a href='mailto:ownyoursongstudio@gmail.com'>ownyoursongstudio@gmail.com</a></p>
            </div>
            <hr/>
          </li>
        </ol>
      </div>
    </div>
  )
}

export default Privacy;