import type { ReactNode } from "react";
import { LegalPage, type LegalSection } from "../legal/LegalPage";

export const metadata = {
  title: "Terms and Conditions — Jazari One",
  description:
    "Version 1 of the US terms governing Jazari One technology services and access to regulated partner services.",
};

type RawSection = {
  id: string;
  title: string;
  body: string;
};

const rawSections: RawSection[] = [
  {
    id: "introduction",
    title: "1. Introduction",
    body: `1.1 Jazari and Jazari ONE are trading names used to describe the technology platform operated in the United States. Jazari ONE's services are provided in partnership with [US Issuer / Regulated Partner], an Illinois corporation with its principal office at [US Issuer Address - to be confirmed] ("[US Issuer / Regulated Partner]"). [US Issuer / Regulated Partner] holds applicable federal and state money services business licences and money transmitter licences required to offer payment and remittance services in the United States.

1.2 Jazari ONE operates as a technology platform and acts solely as a technical and commercial interface through which you access services provided by [US Issuer / Regulated Partner] and other regulated partners. Jazari ONE does not itself provide payment accounts, money transmission, remittance services, or any other regulated financial services. All such regulated services are provided by or through [US Issuer / Regulated Partner] and its banking and payment partners under their applicable licences.

1.3 [US Issuer / Regulated Partner] holds Money Transmitter Licences in the states in which it operates. A complete list of state licences and applicable regulatory disclosures is available at jazari.money/licenses (or upon request). Where required by state law, specific disclosures applicable to residents of particular states are set out in Section 29 of these Terms.

1.4 Your funds held in your Jazari ONE account are not FDIC-insured. [US Issuer / Regulated Partner] safeguards customer funds by holding them in one or more pooled trust accounts at FDIC-insured depository institutions, separate from [US Issuer / Regulated Partner]'s operating funds. While these measures are designed to protect your funds, there is a risk that, in the event of the insolvency of the institution holding your safeguarded funds, your money may be at risk.

1.5 By accepting these Terms, you also agree to the terms of service of [US Issuer / Regulated Partner] applicable to your use of their services, available at [US Issuer / Regulated Partner]'s website. In the event of a conflict between these Terms and [US Issuer / Regulated Partner]'s terms, [US Issuer / Regulated Partner]'s terms will prevail with respect to the services they directly provide.

1.6 Jazari ONE's Role. Jazari ONE is a financial technology company, not a bank, money transmitter, or licensed financial services provider. Jazari ONE does not hold, transmit, or control customer funds at any point. Jazari ONE provides technology infrastructure — including the App, user interface, transaction initiation, and account management tools — that enables you to access regulated financial services provided by [US Issuer / Regulated Partner] and other regulated partners. The regulated financial activity underlying your account, including fund custody, payment processing, money transmission, and remittance execution, is carried out solely by [US Issuer / Regulated Partner] and its regulated partners under their applicable federal and state licences.`,
  },
  {
    id: "definitions",
    title: "2. Definition",
    body: `In these Terms, the following definitions apply:

TABLE:Term|Meaning
"Account Balance"|The total amount of funds currently held in your Jazari ONE Account and available for use.
"Account Limit"|The maximum amount your Jazari ONE Account may hold at any one time, as set out in the Fee Schedule.
"ACH"|Automated Clearing House — a US electronic funds transfer network used for bank-to-bank transactions.
"AML"|Anti-Money Laundering — laws and regulations designed to detect and prevent financial crimes, including the Bank Secrecy Act and FinCEN regulations.
"App"|The official Jazari ONE mobile application available on iOS and Android.
"BSA"|The Bank Secrecy Act, 31 U.S.C. §§ 5311 et seq., and its implementing regulations.
"Business Day"|Any day other than a Saturday, Sunday, or a US federal public holiday.
"CFPB"|The Consumer Financial Protection Bureau, the federal agency responsible for consumer financial protection in the United States.
"Credit Builder"|A feature of your Jazari ONE Account that helps you build a credit profile by making timely repayments on RNPL transactions, which may be reported to Credit Reporting Agencies.
"Credit Reporting Agencies" or "CRAs"|Equifax, Experian, and TransUnion, and any other consumer reporting agency as defined under the Fair Credit Reporting Act ("FCRA").
"Customer Service"|The Jazari ONE support centre, reachable via email at support@jazarione.com or through in-app chat.
"EFTA"|The Electronic Fund Transfer Act, 15 U.S.C. §§ 1693 et seq., and its implementing regulation, Regulation E (12 C.F.R. Part 1005).
"FinCEN"|The Financial Crimes Enforcement Network, a bureau of the US Department of the Treasury.
"GLBA"|The Gramm-Leach-Bliley Act, 15 U.S.C. §§ 6801 et seq., governing the privacy of consumer financial information.
"Jazari ONE Account"|The prepaid payment account provided by or through [US Issuer / Regulated Partner] under these Terms, accessible via the App or Website.
"MSB"|Money Services Business — a category of financial institution regulated by FinCEN under the BSA.
"OFAC"|The Office of Foreign Assets Control of the US Department of the Treasury, which administers US sanctions programmes.
"[US Issuer / Regulated Partner]"|[US Issuer / Regulated Partner], an Illinois corporation, [US Issuer Address - to be confirmed], which holds applicable money transmitter licences and provides the underlying payment infrastructure for Jazari ONE.
"Recipient"|The individual or entity to whom you send money from your Jazari ONE Account.
"Regulation E"|The federal regulation implementing the EFTA, governing electronic fund transfers (12 C.F.R. Part 1005).
"Remit Now, Pay Later" or "RNPL"|A lending product that enables you to send an international remittance before paying the full remittance amount, with repayments made in installments, subject to credit approval and applicable lending laws.
"Remittance" or "Remit"|The process of sending money from your Jazari ONE Account to another individual or account, typically outside the United States, as part of a cross-border transaction.
"State Regulator"|The applicable state financial regulatory authority in your state of residence.
"Technology Services"|The software platform, App, user interface, and associated technical services provided by Jazari ONE to enable you to access regulated financial services offered by [US Issuer / Regulated Partner] and other regulated partners. Technology Services do not include any regulated financial services, which are provided solely by [US Issuer / Regulated Partner] and its regulated partners.
"TILA"|The Truth in Lending Act, 15 U.S.C. §§ 1601 et seq., and its implementing regulation, Regulation Z (12 C.F.R. Part 1026).
"UDAP"|Unfair, deceptive, or abusive acts or practices, prohibited under the Consumer Financial Protection Act and applicable state consumer protection laws.
"US Lending Partner"|[US Lending Partner to be confirmed] — the entity licensed under applicable federal and state laws to provide RNPL credit to eligible Jazari ONE customers.
"We / Us / Our"|Jazari ONE and/or [US Issuer / Regulated Partner], depending on the context.
"Website"|The official Jazari ONE website at jazari.money.
"You / Your"|The individual who opened the Jazari ONE Account and is authorised to use the associated services.`,
  },
  {
    id: "account",
    title: "3. Your Jazari One account",
    body: `3.1 Your Jazari ONE Account is a prepaid payment account provided by [US Issuer / Regulated Partner]. Jazari ONE provides the technology platform through which you access and manage your account but is not the account provider and does not hold or control your funds.

3.2 These Terms constitute a legal agreement between you and us. By submitting your application to open a Jazari ONE Account, you confirm that:

- all information you have provided is true, accurate, and belongs to you, and you will update us if your contact details change;
- you are legally capable of entering into a binding agreement under applicable federal and state law;
- you will only use your Jazari ONE Account for lawful personal purposes as outlined in these Terms;
- you are a resident of the United States, are at least 18 years of age (or the age of majority in your state), and are able to manage your own financial affairs;
- you are acting on your own behalf and not as an agent for any third party;
- you consent to us verifying your identity through third-party identity verification providers — see Section 21 for details;
- you consent to us or our partners conducting a soft credit inquiry for eligibility purposes.

3.3 To open an account, you must provide all required information and pass our identity verification and AML checks as required by applicable law, including the Customer Identification Program ("CIP") requirements under the BSA.

3.4 We may decline your application at our discretion and are not required to provide a reason.

3.5 Upon successful verification and approval, we will provide you with access to your Jazari ONE Account through the App.

3.6 Your account is subject to balance limits and transaction limits as set out in the Fee Schedule in Section 25.

3.7 You can view and download your account activity at any time through the Jazari ONE App.

3.8 We may charge a Monthly Subscription or Maintenance Fee as set out in the Fee Schedule. This fee will be automatically deducted from your balance. If your balance is insufficient to cover the fee, we may attempt to collect it when your balance is next credited.`,
  },
  {
    id: "payments",
    title: "4. Payments into and out of your account",
    body: `### Payments In

4.1 You may add funds to your Jazari ONE Account using the following methods: ACH bank transfer from a linked US bank account, debit card load, or such other methods as we make available through the App from time to time.

4.2 Limits and fees applicable to loading your account are set out in the Fee Schedule.

4.3 The timing of your account being credited depends on the funding method used. ACH transfers typically take one to three Business Days. We will update your account balance upon receipt of cleared funds by [US Issuer / Regulated Partner] or its banking partner.

### Payments Out

4.4 Only verified account holders who meet applicable regulatory requirements are authorised to make payments from their Jazari ONE Account. We and [US Issuer / Regulated Partner] reserve the right to verify all payment recipients and may decline transactions based on regulatory concerns.

4.5 You are solely responsible for ensuring that recipient payment details (including routing number, account number, and recipient name) are correct before confirming any transaction.

4.6 If you send a payment using incorrect details, we will use reasonable efforts to assist with recovery, but we cannot guarantee a successful recovery and are not liable for losses resulting from incorrect payment details you have provided.

4.7 Transactions received after 4:00 PM Central Time on a Business Day, or received on a non-Business Day, will be treated as received on the next Business Day.

4.8 Once a payment is authorised, it generally cannot be cancelled or reversed. See Section 5 (International Remittances) for specific cancellation rights applicable to remittance transactions under the Remittance Transfer Rule.

4.9 We or [US Issuer / Regulated Partner] may refuse or suspend a transaction if:

- it would exceed your account balance or account limits;
- it would violate applicable law, including BSA/AML laws, OFAC sanctions, or applicable state money transmitter laws;
- the recipient is subject to legal restrictions or we do not support payments to that organisation;
- we suspect fraud, money laundering, or other prohibited activity;
- we experience system outages or technical issues.

4.10 We are not liable for delays or failures in processing caused by events outside our reasonable control, including third-party financial institution processing times, network outages, or government or regulatory action.`,
  },
  {
    id: "remittances",
    title: "5. International remittances",
    body: `International remittance services are provided by [US Issuer / Regulated Partner] under its applicable money transmitter licences. Jazari ONE facilitates your access to these services through the App but does not itself transmit funds, hold remittance funds, or provide money transmission services.

IMPORTANT: Remittance Transfer Rule Notice: International money transfers sent from the United States are subject to the Consumer Financial Protection Bureau's Remittance Transfer Rule (12 C.F.R. Part 1005, Subpart B). Under this Rule, you have certain rights as a consumer, including the right to receive a pre-payment disclosure, receipt, and cancellation rights. Details are set out in this Section.

5.1 Pre-Payment Disclosure: Before you authorise an international remittance, we will provide you with a disclosure showing: (a) the exchange rate applicable to the transaction; (b) any fees and taxes we impose; (c) any third-party fees we are aware of (to the extent disclosed to us); (d) the amount to be transferred; (e) the amount to be received by the recipient in the destination currency; and (f) the estimated date on which the funds will be available to the recipient.

5.2 Exchange Rate: The exchange rate applicable to your remittance will be provided and locked at the time you confirm your transaction (the "Offer Rate"). The Offer Rate is final once you have confirmed the transaction. By proceeding, you accept the Offer Rate.

5.3 Fees: Each remittance may be subject to a transaction fee, which will be clearly disclosed before you confirm. Additional third-party charges may apply (including correspondent bank charges or local taxes in the destination country). We are not responsible for charges imposed by third parties that we do not control and that have not been disclosed to us.

5.4 Transaction Statuses:

- Pending: The transaction has been initiated and is being processed.
- Completed: Funds have been successfully delivered to the designated recipient account or cash pick-up point.
- Declined: The transaction could not be processed due to insufficient funds, regulatory restrictions, compliance review, or failed recipient validation.

5.5 Estimated Delivery Times: Delivery times vary by destination, payout method, and regulatory requirements. We will provide an estimated delivery date in your pre-payment disclosure. Typical processing times range from minutes to 5 Business Days but are not guaranteed. Delays may occur due to public holidays, recipient institution processing, compliance reviews, or technical issues.

5.6 Cancellation Rights: Under the CFPB's Remittance Transfer Rule, you have the right to cancel your remittance within 30 minutes of payment authorisation and receive a full refund. To cancel, contact Customer Service immediately via in-app chat or at support@jazarione.com. If the funds have already been picked up or deposited by the recipient, you may not be eligible for a cancellation. Where cancellation is available after the 30-minute window, we will advise you of available options.

5.7 Error Resolution: If you believe an error has occurred in connection with a remittance (including that the remittance was not made available by the specified date or that you were charged an incorrect amount), you must contact us within 180 days of the promised availability date. Contact Customer Service via in-app chat, by phone, or at support@jazarione.com. We will investigate and resolve the error within the timeframes required under the Remittance Transfer Rule.

5.8 Transaction Monitoring: Jazari applies automated and manual transaction monitoring to detect fraud, money laundering, and other prohibited activity. Transactions may be paused, flagged, or reviewed. We may request additional documentation before releasing funds. Transactions deemed suspicious may be declined or reported to relevant authorities as required by law, including FinCEN.

5.9 Rollbacks: We may reverse a remittance in certain circumstances, including: regulatory or legal obligation; fraudulent activity detected after initiation; technical errors (e.g., duplicate transactions); or recipient account issues. Where a rollback occurs, funds will be returned to your Jazari ONE Account. Exchange rate differences that arise due to a rollback are not compensable unless the rollback was caused by our error.`,
  },
  {
    id: "rnpl",
    title: "6. Remit Now, Pay Later (RNPL)",
    body: `Remit Now, Pay Later ("RNPL") allows eligible customers to complete an international remittance immediately while deferring payment to a later date. This service is subject to credit approval and is provided by the US Lending Partner, a third-party lender licensed under applicable US federal and state consumer lending laws.

6.1 Credit Provider: All RNPL loans are made by [US Lending Partner], a licensed consumer lender under applicable federal and state law. Jazari ONE facilitates access to RNPL but is not the lender and does not make credit decisions. Credit decisions are made solely by the US Lending Partner.

6.2 By selecting RNPL, you agree to enter into a separate credit agreement with the US Lending Partner. The terms of that agreement, including the Annual Percentage Rate ("APR"), finance charges, total repayment amount, and repayment schedule, will be presented to you before you confirm the transaction, in accordance with the Truth in Lending Act ("TILA") and Regulation Z.

6.3 TILA Disclosures: Prior to completing any RNPL transaction, the US Lending Partner will provide you with a TILA disclosure box containing: the APR; the finance charge; the amount financed; the total of payments; and the payment schedule. You must review and accept these disclosures before the transaction is processed.

6.4 Eligibility: Eligibility for RNPL and the amount offered are determined by the US Lending Partner based on your remittance history on Jazari ONE, repayment behaviour on prior RNPL loans (if any), creditworthiness and affordability assessments, and applicable state and federal lending laws. Jazari ONE has no influence over credit decisions.

6.5 Availability: RNPL is only available as part of the international remittance flow within the Jazari ONE app. It cannot be used as a general-purpose loan or for non-remittance purposes. The RNPL option will appear at checkout if you are eligible.

6.6 Repayment: Repayments are made in accordance with the schedule set out in your credit agreement with the US Lending Partner. You may repay via: (a) in-app payment from your Jazari ONE Account balance; or (b) ACH transfer from your linked bank account. It is your responsibility to ensure repayment by the due date.

6.7 Late Payment: If you fail to repay on time, the US Lending Partner may impose late fees or charges as set out in your credit agreement. Late payment may also be reported to Credit Reporting Agencies and may adversely affect your credit score. Continued non-payment may result in debt collection action and restrictions on future use of RNPL or other Jazari ONE services.

6.8 State Lending Laws: RNPL availability may vary by state based on applicable state lending and consumer finance laws. We will notify you if RNPL is not available in your state of residence. Nothing in these Terms constitutes an offer of credit where prohibited by applicable state law.

6.9 Credit Reporting: RNPL repayments may be reported to one or more Credit Reporting Agencies by the US Lending Partner to help you build a credit history. Reporting practices are governed by the US Lending Partner's credit agreement and applicable FCRA requirements.

6.10 Rollbacks: If an underlying remittance funded via RNPL is declined, reversed, or fails, Jazari ONE will initiate a rollback and all funds will be credited to your Jazari ONE Account. If funds were already drawn from the US Lending Partner and the loan was registered, you remain responsible for repayment in accordance with your credit agreement.`,
  },
  {
    id: "unauthorised-transactions",
    title: "7. Unauthorised transactions and error resolution",
    body: `### Your Rights Under the Electronic Fund Transfer Act (EFTA / Regulation E)

Federal law provides important protections for electronic fund transfers. Your liability for unauthorised transactions is limited as described below. Please read this Section carefully and report any suspected unauthorised transactions immediately.

7.1 Reporting Unauthorised Transactions: If you believe your Jazari ONE Account, access credentials, or device have been lost, stolen, or compromised, you must contact us immediately via in-app chat, email at support@jazarione.com, or by calling our Customer Service number listed in the App.

7.2 Liability for Unauthorised Electronic Fund Transfers:

- If you report within 2 Business Days of learning of the loss or theft: your maximum liability is $50.
- If you report after 2 Business Days but within 60 days of the statement showing the unauthorised transfer: your maximum liability is $500.
- If you report after 60 days of the statement: you may lose all funds transferred without your authorisation after the 60-day period.

7.3 These liability limits may be reduced further if we do not provide you with the required periodic statements or disclosures in compliance with Regulation E.

7.4 Error Resolution Procedures: If you believe there has been an error in an electronic fund transfer involving your account (including an incorrect amount, an unauthorised transaction, or a transaction that was not completed), you must notify us:

- Orally or in writing, within 60 days of the date we sent (or made available to you) the first periodic statement showing the error; or
- Within 180 days of the date the transfer was made, in the case of a remittance transfer.

7.5 Your notice must include: (a) your name and account number; (b) a description of the error and why you believe it is an error; and (c) the dollar amount of the suspected error.

7.6 We will acknowledge receipt of your notice within 5 Business Days and will resolve the investigation within 10 Business Days (or 45 Business Days for new accounts, point-of-sale transactions, or foreign-initiated transactions). If we need additional time, we will provisionally credit your account within 5 Business Days while we continue the investigation.

7.7 We will provide you with written notification of the results of our investigation within 3 Business Days after completing it. If we determine there was no error, we will explain our findings and, if a provisional credit was issued, we will reverse it with 5 Business Days' notice.`,
  },
  {
    id: "transactions",
    title: "8. Transactions",
    body: `8.1 Any use of your Jazari ONE Account will be treated as your consent to the transaction.

8.2 Transactions are considered received at the time we receive the order. Transactions received after 4:00 PM Central Time or on a non-Business Day will be treated as received on the next Business Day.

8.3 Once a transaction is authorised, it generally cannot be cancelled. See Section 5.6 for your cancellation rights in respect of international remittances. You are responsible for authorised transactions.

8.4 We may refuse or suspend a transaction due to system issues or for the reasons set out in Section 4.9.

8.5 If a payment is made to your account in error, we may return the funds. If you dispute that it was an error, we may share necessary information with the sending institution to resolve the matter.

8.6 Suspected Authorised Push Payment ("APP") Fraud: If you authorise a payment but later believe you were deceived into doing so (e.g., through a scam or impersonation), you should report it to us immediately and also to the relevant law enforcement authorities. We will investigate all such reports in accordance with our internal fraud procedures and applicable CFPB guidance on fraud liability.`,
  },
  {
    id: "foreign-currency",
    title: "9. Foreign currency transactions",
    body: `9.1 Your Jazari ONE Account is denominated in US Dollars ("USD"). For transactions conducted in a foreign currency (including international remittances), the amount will be converted to USD (or the destination currency, as applicable) at the exchange rate quoted at the time of the transaction.

9.2 Exchange rates fluctuate. The rate applied to your transaction will be disclosed to you before you confirm. Your account statement will show the exchange rate and any applicable fee.

9.3 We are not liable for changes in exchange rates between the time you initiate a transaction and the time it is processed.`,
  },
  {
    id: "checking-balance",
    title: "10. Checking your balance",
    body: `10.1 You can check your account balance and transaction history at any time through the Jazari ONE App. You may also request a balance inquiry by contacting Customer Service.

10.2 Periodic Statements: We will make periodic account statements available to you electronically through the App at least monthly. These statements satisfy the periodic statement requirements of Regulation E.`,
  },
  {
    id: "managing-balance",
    title: "11. Managing your balance",
    body: `11.1 You must manage your account balance within the limits set out in the Fee Schedule.

11.2 If an incoming payment causes your balance to exceed your Account Limit, it may be returned to the sender. We are not liable for any losses arising from such a return.

11.3 You are responsible for ensuring your account has sufficient funds to cover all outgoing transactions. We will not process a transaction that would result in a negative balance, except as may be permitted in connection with fee deductions described in Section 3.8.`,
  },
  {
    id: "fund-redemption",
    title: "12. Account closure and fund redemption",
    body: `12.1 You may redeem your Account Balance at any time by requesting a transfer of funds to your linked US bank account. We may charge a redemption fee as set out in the Fee Schedule.

12.2 Inactive Accounts: If your account has no transaction activity for 12 consecutive months, we may classify it as inactive and apply an inactivity fee (if any) as set out in the Fee Schedule. After the applicable inactivity period, unclaimed funds may be subject to escheatment (transfer to the relevant state's unclaimed property fund) under applicable state unclaimed property laws. We will provide you with required notices before any escheatment.

12.3 To close your account, contact Customer Service. Before closure: (a) all outgoing transactions must be settled; (b) any outstanding RNPL balance must be repaid in full, including interest and fees; and (c) your Account Balance must be zero or transferred to a designated US bank account in your name.

12.4 We may request proof of identity or ownership of the recipient account before releasing funds.

12.5 Once all conditions in this Section are met, your account will be closed within 5 Business Days of your request.`,
  },
  {
    id: "third-party-services",
    title: "13. Third-party services and open banking",
    body: `13.1 You may authorise regulated third-party providers ("TPPs") to access your Jazari ONE Account and initiate payments on your behalf, where such access is made available through the App.

13.2 You are responsible for verifying that any TPP is properly licensed before granting access. We are not responsible for the acts or omissions of TPPs.

13.3 You must report any unauthorised or incorrect transactions initiated by a TPP to us as soon as possible in accordance with Section 7.

13.4 We may suspend or block TPP access if we have reasonable grounds to believe the provider is acting fraudulently or without proper authorisation. We will notify you unless doing so would compromise security or is prohibited by law.`,
  },
  {
    id: "liability",
    title: "14. Liability",
    body: `14.1 Nothing in these Terms limits either party's liability for: (a) fraud or wilful misconduct; (b) death or personal injury caused by negligence; or (c) any liability that cannot be excluded or limited under applicable federal or state law, including rights under the EFTA, TILA, or applicable consumer protection statutes.

14.2 We are only liable for losses that result directly and foreseeably from our breach of these Terms or applicable law.

14.2a Jazari ONE's liability under these Terms is limited to its role as a technology platform provider. Jazari ONE is not responsible for the acts, omissions, or regulatory compliance of [US Issuer / Regulated Partner] or any other regulated partner in the performance of their respective regulated financial services, except to the extent that a loss arises directly from Jazari ONE's own breach of these Terms.

14.3 We are not liable for:

- events outside our reasonable control, including acts of God, government actions, network outages, or third-party failures;
- losses arising from your provision of incorrect transaction details;
- losses caused by your failure to keep your account credentials secure;
- indirect, special, incidental, or consequential damages, to the maximum extent permitted by applicable law.

14.4 If we deduct an incorrect amount from your account in error, we will correct the error. For unauthorised transactions properly reported under Section 7, we will refund the amount up to the limits permitted under Regulation E.

14.5 These limitations apply equally to [US Issuer / Regulated Partner] and any of our service providers, contractors, and partners.`,
  },
  {
    id: "changes",
    title: "15. Changes to these terms",
    body: `15.1 We may amend these Terms at any time. Changes will be communicated to you via email or in-app notification.

15.2 Changes that are required to comply with applicable law, correct an error, or make minor technical adjustments may take effect immediately upon notice.

15.3 For all other material changes, we will provide at least 21 days' advance notice (or such longer period as required by applicable state law). If you continue to use your Jazari ONE Account after the effective date of the change, you will be deemed to have accepted the revised Terms. If you do not agree to a material change, you may close your account without penalty before the change takes effect.

15.4 The current version of these Terms is always available at jazari.money/terms.`,
  },
  {
    id: "cancellation-rights",
    title: "16. Cancellation rights",
    body: `16.1 After your account is approved, you may close your account at any time by contacting Customer Service. There is no mandatory cooling-off period under federal law for prepaid accounts, but your cancellation rights for specific remittance transactions are described in Section 5.6.

16.2 Upon account closure, any remaining Account Balance will be returned to you in accordance with Section 12.

16.3 If you have an outstanding RNPL balance, it must be repaid in full before your account can be closed.`,
  },
  {
    id: "ending-agreement",
    title: "17. Ending the agreement and account closure",
    body: `17.1 We may terminate this Agreement and close your account by providing at least 30 days' advance notice, except in the circumstances described in Section 17.2.

17.2 We may immediately suspend or terminate your account and close it without advance notice if:

- you breach a material provision of these Terms;
- we are required to do so by applicable law, a regulatory authority, or a court order;
- we suspect fraud, money laundering, terrorist financing, or sanctions violations;
- you act in a threatening, abusive, or otherwise inappropriate manner toward our staff;
- you fail to pay any fees or charges, or do not repay a negative balance when requested;
- we have security concerns relating to your account.

17.3 Upon account termination, all pending payment instructions may be cancelled and incoming payments will be returned to the sender. We will return any remaining Account Balance in accordance with Section 12.

17.4 If a payment is in process at the time your account is closed, it may still be processed. It is your responsibility to make alternative arrangements for any incoming or outgoing payments.

17.5 You may terminate this Agreement at any time by contacting Customer Service, subject to the conditions in Section 12.`,
  },
  {
    id: "rewards",
    title: "18. Rewards and promotions",
    body: `18.1 Jazari ONE may offer promotional rewards, loyalty points, or cashback ("Promotions"). Promotions are discretionary, have no cash value, are not transferable, and are not redeemable for cash. They do not constitute regulated money services.

18.2 The specific terms for earning and redeeming rewards will be set out in the App or on the Website ("Offer Terms"). Points will not be earned on excluded transactions such as gambling, cash withdrawals, or tax payments.

18.3 We reserve the right to amend, suspend, or withdraw any Promotion at any time. In the event of a conflict between these Terms and specific Offer Terms, the Offer Terms will prevail.

18.4 Points may expire if unused within the period specified in the applicable Offer Terms. Unredeemed points will be forfeited upon account closure.`,
  },
  {
    id: "general",
    title: "19. General provisions",
    body: `19.1 By opening a Jazari ONE Account, you consent to us using your information as described in Section 21 (How We Use Your Information).

19.2 We may monitor and record telephone calls and communications between you and our Customer Service team for quality, training, and legal compliance purposes.

19.3 You must provide a valid email address, US mailing address, and phone number, and keep these details current. We will use your email address to send account-related notices and legally required disclosures.

19.4 Assignment: We may assign or transfer our rights and obligations under these Terms to another entity (including in the context of a business reorganisation, merger, or acquisition) upon at least 30 days' prior notice to you. You may close your account before the assignment takes effect if you do not agree. You may not assign your rights or obligations under these Terms.

19.5 Waiver: Our failure to enforce any provision of these Terms does not constitute a waiver of our right to enforce that provision in the future.

19.6 Severability: If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.

19.7 Entire Agreement: These Terms, together with the Fee Schedule and any applicable Offer Terms, constitute the entire agreement between you and us with respect to your Jazari ONE Account.

19.8 Language: These Terms are written in English. All communications will be in English.

19.9 Governing Law: These Terms are governed by the federal laws of the United States and, to the extent applicable, the laws of the State of Illinois, without regard to conflict of law principles. Nothing in this Section affects your rights under applicable state law.

19.10 Communications Consent: By creating a Jazari ONE Account, you agree that we may contact you via email, SMS, push notification, and other electronic means for account-related communications. For marketing communications, we will obtain your separate consent where required by applicable law.

19.11 Regulatory Status. Jazari ONE is not a bank, credit institution, money transmitter, or licensed financial services provider under applicable federal or state law. Jazari ONE holds a FinCEN MSB registration (Registration No. MRX26-00006547) reflecting its compliance obligations as an entity operating in the payments ecosystem. All regulated financial services accessible through the Jazari ONE platform are provided by [US Issuer / Regulated Partner] and other regulated partners under their own licences, authorisations, and regulatory obligations.`,
  },
  {
    id: "intellectual-property",
    title: "20. Intellectual property",
    body: `20.1 We own or license all intellectual property rights in the Website, App, Jazari ONE Account, and associated materials. These works are protected by US and international copyright, trademark, and other intellectual property laws.

20.2 "Jazari" and "Jazari ONE" and their logos are trademarks. Unauthorised use of these marks may result in legal action.

20.3 You may not reproduce, modify, distribute, or commercially exploit any content from the Website or App without our prior written consent.`,
  },
  {
    id: "privacy",
    title: "21. Privacy and how we use your information",
    body: `21.1 Privacy Notice: Our full Privacy Policy, available at jazari.money/privacy, explains how we collect, use, share, and protect your personal information. By using Jazari ONE services, you acknowledge our Privacy Policy. This Section provides a summary of our key data practices.

21.2 Financial Privacy (GLBA / Regulation P): As a financial services provider, we are required to provide you with a notice about our privacy practices under the GLBA. We will provide you with our GLBA Privacy Notice at account opening and annually thereafter. You may have the right to opt out of certain sharing of your non-public personal information with non-affiliated third parties.

21.3 Identity Verification: We will share your information with third parties who conduct identity verification and AML checks, as required by our CIP obligations under the BSA. These checks may include sharing data with identity verification providers and, where applicable, credit reporting agencies. Identity-verification inquiries are "soft pulls" that do not affect your credit score.

21.4 Credit Reporting: We may conduct soft credit inquiries for eligibility purposes. If you use RNPL, the US Lending Partner may conduct a hard credit inquiry, which will be disclosed to you before the inquiry is made.

21.5 Data We Collect: We collect information you provide to us (including name, address, date of birth, Social Security Number or Individual Taxpayer Identification Number, contact details), information from identity verification providers, transaction data, and device and usage information.

21.6 How We Use Your Data: We use your data to: provide and manage your Jazari ONE Account; comply with AML, BSA, OFAC, and other regulatory obligations; prevent and detect fraud and financial crime; conduct credit assessments for RNPL; communicate with you about your account; improve our services; and, with your consent, for marketing purposes.

21.7 Data Sharing: We may share your data with: [US Issuer / Regulated Partner] and its banking partners; identity verification and fraud prevention services; Credit Reporting Agencies (in connection with RNPL); FinCEN, OFAC, and other government or regulatory authorities; law enforcement, when required by law; and service providers acting on our behalf under appropriate data processing agreements.

21.8 International Transfers: Processing your data may involve transferring it outside of the United States. We will ensure that appropriate safeguards are in place for any such transfers.

21.9 Data Retention: We retain your information only as long as required by applicable law (including BSA record-keeping requirements, which mandate retention of certain records for five years) or as otherwise necessary for our legitimate business purposes.

21.10 State Privacy Rights: Depending on your state of residence, you may have additional privacy rights. Residents of California, Virginia, Colorado, Connecticut, Texas, and other states with comprehensive privacy laws may have rights to access, correct, delete, or opt out of the sale or sharing of their personal data. Please see our Privacy Policy at jazari.money/privacy for state-specific information and to submit a privacy request.

21.11 Fraud Prevention: We share information with fraud prevention agencies to protect our customers and the financial system from fraud, money laundering, and financial crime. Records of fraud risk may be retained for up to six years.`,
  },
  {
    id: "complaints",
    title: "22. Complaints and how to contact us",
    body: `22.1 If you are dissatisfied with any aspect of our service, please contact Customer Service via in-app chat, email at support@jazari.com, or by mail to: Jazari ONE, [US Address to be confirmed]. We will acknowledge your complaint promptly and aim to resolve it within 15 Business Days.

22.2 If we are unable to resolve your complaint to your satisfaction, you may escalate it to the CFPB:

Consumer Financial Protection Bureau (CFPB)
Website: consumerfinance.gov/complaint
Phone: 1-855-411-2372 (Mon–Fri, 8am–8pm ET)
Address: 1700 G Street NW, Washington, DC 20552

22.3 You may also contact your State Regulator. A list of state financial regulatory contacts is available at jazari.money/regulators.

22.4 For complaints relating to [US Issuer / Regulated Partner]'s money transmitter licence activities, you may also have the right to contact the applicable State Regulator directly.

22.5 Nothing in this Section limits your right to pursue individual legal action in the appropriate court, subject to the Arbitration Agreement in Section 23.

22.6 Emergency Contact: In the event of suspected fraud, account compromise, or a security threat, contact us immediately via in-app chat or at the emergency number listed in the App. We will use the most recent contact details you have provided.`,
  },
  {
    id: "arbitration",
    title: "23. Arbitration agreement and class action waiver",
    body: `IMPORTANT: PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS.

This Section contains an Arbitration Agreement and a Class Action Waiver. By accepting these Terms, you agree to resolve most disputes with Jazari ONE through binding individual arbitration rather than in court, and you waive your right to participate in a class action lawsuit or class-wide arbitration.

You have the right to opt out of this Arbitration Agreement within 30 days of opening your account. See Section 23.7 for details.

23.1 Scope: Except as set out in Section 23.2, you and Jazari ONE agree that any dispute, claim, or controversy arising out of or relating to these Terms or your use of the Jazari ONE Account (collectively, "Disputes") will be resolved exclusively through final and binding arbitration, rather than in court.

23.2 Exceptions: The following are not subject to arbitration: (a) claims that qualify for small claims court (provided they remain in that court and are not brought as class actions); (b) requests for injunctive or other equitable relief to prevent unauthorised use of intellectual property; (c) claims that cannot be subjected to arbitration under applicable federal law.

IMPORTANT: 23.3 CLASS ACTION WAIVER: TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, YOU AND JAZARI ONE WAIVE ANY RIGHT TO BRING OR PARTICIPATE IN A CLASS ACTION, COLLECTIVE ACTION, OR REPRESENTATIVE ACTION. DISPUTES MUST BE BROUGHT ON AN INDIVIDUAL BASIS ONLY.

23.4 Arbitration Process: Arbitration will be conducted by the American Arbitration Association ("AAA") under its Consumer Arbitration Rules (available at adr.org) or, for claims involving amounts of $25,000 or less, its Expedited Procedures. The arbitration will be conducted in English, and the arbitrator will apply applicable federal and state law. The arbitrator's decision will be final and binding.

23.5 Fees: AAA Consumer Arbitration filing fees will be allocated in accordance with the AAA's Consumer Arbitration Rules. We will pay any fees we are required to pay under the AAA Rules.

23.6 Location: Arbitration may be conducted by telephone, videoconference, document submission, or in person in the US county where you reside, at your election.

23.7 Opt-Out Right: You may opt out of this Arbitration Agreement by sending a written notice to legal@jazarione.com within 30 days of the date you first accept these Terms. Your notice must include your name, account number, and a statement that you wish to opt out of the Arbitration Agreement. Opting out will not affect any other provision of these Terms.

23.8 If the class action waiver in Section 23.3 is found to be unenforceable for a particular claim or type of claim, that claim will proceed in court on a class basis and will be severed from the arbitration agreement.`,
  },
  {
    id: "electronic-disclosures",
    title: "24. Electronic disclosures and E-sign consent",
    body: `24.1 E-SIGN Consent: In accordance with the Electronic Signatures in Global and National Commerce Act ("E-SIGN Act"), by opening a Jazari ONE Account you consent to receiving all disclosures, notices, agreements, statements, and other communications ("Communications") electronically, via the App or to the email address you have provided.

24.2 This consent includes, without limitation, periodic account statements, TILA disclosures, GLBA privacy notices, error resolution notices, and any amendments to these Terms.

24.3 Hardware and Software Requirements: To access and retain electronic Communications, you need: a device with internet access; a current web browser or the Jazari ONE App; and the ability to open PDF documents. You are responsible for maintaining these requirements.

24.4 Withdrawal of Consent: You may withdraw your consent to electronic Communications at any time by contacting Customer Service. Withdrawing consent may limit your ability to use certain features of the Jazari ONE Account and may result in account closure.

24.5 Paper Copies: You may request a paper copy of any Communication by contacting Customer Service. A fee may apply.`,
  },
  {
    id: "fees",
    title: "25. Fee schedule",
    body: `The following fees apply to your Jazari ONE Account. All fees are in US Dollars (USD). Additional fees may apply for services not listed below — see the full Terms and the App for details.

### Account Fees

TABLE:Service / Feature|Fee / Detail
Monthly Subscription / Maintenance Fee|$[X] per month
Account Opening / Issuance Fee|Free
Inactivity Fee (after 12 months of no activity)|$[X] per month
Account Closure Fee|Free

### Funding (Add Money)

TABLE:Service / Feature|Fee / Detail
ACH Bank Transfer (US bank account)|First transfer per month: Free; Additional: $0.49
Debit Card Load|$0.20 per load
PayPoint or Cash Deposit|Not available

### Payments Out

TABLE:Service / Feature|Fee / Detail
ACH Transfer to US Bank Account (1st party)|$0.20
ACH Transfer to Another US Account|First per month: Free; Additional: $0.49
Internal Transfer (Jazari ONE to Jazari ONE)|Free
Wire Transfer|$[X]

### International Remittances

TABLE:Service / Feature|Fee / Detail
Remittance (standard international transfer)|Free
Exchange Rate Margin (FX spread)|Disclosed at time of transaction
Third-party correspondent bank fees|Variable; disclosed at time of transaction

### Remit Now, Pay Later (RNPL)

TABLE:Service / Feature|Fee / Detail
RNPL Fee|10% of remittance amount (all-inclusive)
Repayment Period|30 days
APR (indicative)|Disclosed in TILA disclosure box at checkout
Late Payment Fee|As set out in the US Lending Partner credit agreement

### Other

TABLE:Service / Feature|Fee / Detail
Balance Inquiry (in-app or online)|Free
Paper Statement Request|$[X] per statement
Returned ACH / Insufficient Funds|$[X] per occurrence
Account Balance Redemption (transfer to bank)|Free (first per month); $[X] thereafter

Fee changes: We will provide at least 21 days' advance notice of any material increase in fees, in accordance with Section 15.`,
  },
  {
    id: "kyc",
    title: "26. Know your customer (KYC) and identity verification",
    body: `26.1 We are required by US federal law (including the BSA and FinCEN's Customer Identification Program rules) to verify the identity of all customers at account opening and on an ongoing basis.

26.2 At account opening, you must provide: your full legal name; date of birth; US residential address; and Social Security Number or Individual Taxpayer Identification Number.

26.3 We may use third-party identity verification services to verify the information you provide. If we are unable to verify your identity electronically, we may request physical identity documents.

26.4 Ongoing KYC Refresh: We conduct periodic KYC reviews, typically on an 18- to 24-month cycle. You will be notified via the App when a KYC refresh is due. Failure to complete a required KYC refresh may result in account restrictions or closure.

26.5 We may also require enhanced due diligence for certain transactions or in response to regulatory requirements, and may ask you for additional information or documentation at any time.`,
  },
  {
    id: "referrals",
    title: "27. Referral program and rewards",
    body: `27.1 Jazari ONE may operate a referral programme through which you can earn rewards for referring new users. Upon joining, you will receive a unique referral code.

27.2 For each successful referral (defined as a new user who signs up using your code, completes identity verification, and meets any additional eligibility requirements), you will earn a reward as described in the App.

27.3 Rewards have no cash value and may only be redeemed against eligible features within the Jazari ONE App, as set out in the applicable Offer Terms.

27.4 Reward Limitations: Only one reward may be redeemed per calendar month. Rewards are valid for 24 months from the date of your first successful remittance.

27.5 Tax Treatment: You are responsible for any tax obligations arising from referral rewards. We will report rewards to the IRS where required by applicable law (e.g., on Form 1099-MISC if rewards exceed $600 in a calendar year).`,
  },
  {
    id: "terms-of-credit",
    title: "28. Terms of credit — Remit Now, Pay Later",
    body: `28.1 The RNPL feature provides access to short-term consumer credit to fund international remittances. All credit under this feature is provided by the US Lending Partner. Jazari ONE acts solely as an introducer and facilitator and is not the lender.

28.2 By using RNPL, you agree to enter into a credit agreement with the US Lending Partner. All TILA-required disclosures (APR, finance charge, amount financed, total of payments, payment schedule) will be presented to you for review and acceptance before the loan is made.

28.3 US Lending Partner Details:

TABLE:Item|Detail
Credit Provider|[US Lending Partner - to be confirmed]
Registered in|[State of incorporation - to be confirmed]
Applicable Licences|[Licensed under applicable state consumer lending laws]
Introducer|Jazari ONE
Consumer Credit Agreement|Required (governed by TILA / Regulation Z and applicable state law)
Credit Reporting|Conducted by US Lending Partner in accordance with FCRA
Complaints|Governed by US Lending Partner agreement and applicable CFPB / state rules

28.4 Credit Scoring and Reporting:

- Use of RNPL may help build your credit profile through repayment data reported to one or more Credit Reporting Agencies.
- Credit outcomes may vary based on your repayment behaviour and each CRA's scoring models.
- The US Lending Partner is solely responsible for submitting credit data to CRAs. Jazari ONE does not influence or accept liability for credit reporting accuracy.
- Use of RNPL does not guarantee an improvement to your credit score.

28.5 State Lending Law Variations: In certain states, applicable consumer lending laws may affect the APR, fees, repayment terms, or availability of RNPL. Where state law provides greater consumer protections or different terms, those protections will apply.`,
  },
  {
    id: "state-disclosures",
    title: "29. State-specific disclosures",
    body: `The following additional terms and disclosures apply to residents of the states listed below. Where state law provides rights or protections additional to or different from those in these Terms, those state-law rights will apply.

### California

California Residents: Jazari ONE's services are provided under [US Issuer / Regulated Partner]'s Money Transmission Licence issued by the California Department of Financial Protection and Innovation ("DFPI"). California consumers may contact the DFPI at dfpi.ca.gov. Under the California Consumer Privacy Act ("CCPA") and the California Privacy Rights Act ("CPRA"), California residents have the right to know about, access, correct, delete, and opt out of the sale or sharing of their personal information. Please see our Privacy Policy at jazari.money/privacy for details.

California Finance Lender Disclosure (RNPL): Loans under the RNPL feature made to California residents are subject to the California Financing Law. The US Lending Partner holds a California Finance Lenders licence. Complaints may be directed to the DFPI.

### New York

New York Residents: [US Issuer / Regulated Partner] is licensed by the New York Department of Financial Services ("DFS") as a Money Transmitter. The DFS may be contacted at dfs.ny.gov. New York consumers have certain rights under New York banking and consumer protection laws. In New York, the maximum late charge for RNPL loans is limited by applicable state law.

### Texas

Texas Residents: Jazari ONE is not a bank and your account is not insured by the FDIC. [US Issuer / Regulated Partner] holds a Money Services Business licence issued by the Texas Department of Banking. Complaints about money transmission services may be filed with the Texas Department of Banking at dob.texas.gov.

### Florida

Florida Residents: [US Issuer / Regulated Partner] holds a Money Transmitter Licence issued by the Florida Office of Financial Regulation ("OFR"). Complaints may be directed to the OFR at flofr.gov. Florida residents are protected under the Florida Deceptive and Unfair Trade Practices Act ("FDUTPA").

### Illinois

Illinois Residents: [US Issuer / Regulated Partner] is headquartered in Chicago, Illinois and holds a Transmitter of Money licence issued by the Illinois Department of Financial and Professional Regulation ("IDFPR"). Residents of Illinois may contact the IDFPR at idfpr.illinois.gov. Illinois residents have additional rights under the Illinois Biometric Information Privacy Act ("BIPA") if we collect biometric data for identity verification purposes — we will obtain your written consent before collecting any biometric identifiers.

### All Other States

Residents of all other US states are protected under applicable federal law, including the EFTA, TILA, and GLBA, and applicable state money transmission, consumer lending, and consumer protection laws. Where [US Issuer / Regulated Partner] holds a money transmitter licence in your state, information about that licence is available at jazari.money/licenses. Where state law requires specific disclosures or provides additional consumer protections, those requirements will be incorporated into these Terms by reference.`,
  },
  {
    id: "contact",
    title: "30. Contact information",
    body: `### Jazari ONE — Customer Service

Email: support@jazari.com
In-app Chat: Available 7 days a week
Website: jazari.money
Mailing Address: [US Address - to be confirmed]

### [US Issuer / Regulated Partner]

[US Issuer Address to be confirmed]

CFPB: consumerfinance.gov/complaint | 1-855-411-2372
FinCEN: fincen.gov`,
  },
];

function renderTable(block: string, key: string) {
  const [headerLine, ...rowLines] = block
    .replace(/^TABLE:/, "")
    .split("\n")
    .filter(Boolean);
  const headers = headerLine.split("|");
  const rows = rowLines.map((line) => line.split("|"));

  return (
    <div className="legal-table-wrap" key={key}>
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`${key}-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td key={`${key}-${rowIndex}-${cellIndex}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderBody(body: string): ReactNode {
  return body
    .trim()
    .split(/\n{2,}/)
    .map((block, index) => {
      const key = `legal-block-${index}`;

      if (block.startsWith("TABLE:")) {
        return renderTable(block, key);
      }

      if (block.startsWith("### ")) {
        return <h3 key={key}>{block.slice(4)}</h3>;
      }

      const lines = block.split("\n");
      if (lines.every((line) => line.startsWith("- "))) {
        return (
          <ul key={key}>
            {lines.map((line) => (
              <li key={line}>{line.slice(2)}</li>
            ))}
          </ul>
        );
      }

      if (block.startsWith("IMPORTANT:")) {
        return (
          <p className="legal-notice" key={key}>
            {block.replace(/^IMPORTANT:\s*/, "")}
          </p>
        );
      }

      return (
        <p className={lines.length > 1 ? "legal-address" : undefined} key={key}>
          {lines.map((line, lineIndex) => (
            <span key={`${key}-${lineIndex}`}>
              {line}
              {lineIndex < lines.length - 1 ? <br /> : null}
            </span>
          ))}
        </p>
      );
    });
}

const sections: LegalSection[] = rawSections.map((section) => ({
  id: section.id,
  title: section.title,
  content: renderBody(section.body),
}));

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      date="Effective date: 21 April 2026"
      introduction={null}
      termsVersion="us"
      sections={sections}
    />
  );
}
