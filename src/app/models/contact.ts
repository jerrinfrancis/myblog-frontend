export class Contact{
  senderName: string;
  senderEmail: string;
  senderPhNo :string;
  message: string;
  constructor(values: Object = {}) {
    Object.assign(this, values);
}

}