import Mailer from "react-native-mail";
import { EMAIL } from "../../../config/local-storage-names.ts";
import AsyncStorage from "@react-native-async-storage/async-storage";
export interface IAttachment {
  path: string, // The absolute path of the file from which to read data.
  uri?: string, // The uri of the file from which to read the data.
  // Specify either `type` or `mimeType` to indicate the type of data.
  type: string, // Mime Type: jpg, png, doc, ppt, html, pdf, csv
  mimeType?: string, // - use only if you want to use custom type
  name: string, // Optional: Custom filename for attachment
}

export class EmailService {
  from: string;
  to: string;

  constructor() {
    this.from = "";

  }

  async sendEmail(attachments:IAttachment[] = [], respFunc:(error:string)=>void, subject:string) {

    this.to =  await AsyncStorage.getItem(EMAIL);
    Mailer.mail({
      subject: subject,
      recipients: [this.to],
      // ccRecipients: ['AkitaSpam@gmail.com'],
      // bccRecipients: ['AkitaSpam@gmail.com'],
      body: '<b>Отчет</b>',
      // customChooserTitle: 'This is my new title', // Android only (defaults to "Send Mail")
      isHTML: true,
      attachments: [...attachments]
    }, (error, event) => {
      respFunc(error)
    });
  }
}
