export default class Donation {
  public id: string;
  public donor: string;
  public amount: number;
  public currency: string;
  public purpose: string;
  public timestamp: Date;
  public verified: boolean;

  constructor({
    donor,
    amount,
    currency = 'SEK',
    purpose,
    verified = false,
  }: {
    donor: string;
    amount: number;
    currency?: string;
    purpose: string;
    verified?: boolean;
  }) {
    this.id = this.generateId();
    this.donor = donor;
    this.amount = amount;
    this.currency = currency;
    this.purpose = purpose;
    this.timestamp = new Date();
    this.verified = verified;
  }

  private generateId(): string {
    return (
      'donation_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
    );
  }

  // Method to validate donation
  public isValid(): boolean {
    return this.donor.length > 0 && this.amount > 0 && this.purpose.length > 0;
  }

  // Method to mark as verified
  public markAsVerified(): void {
    this.verified = true;
  }

  // Get formatted amount
  public getFormattedAmount(): string {
    return `${this.amount} ${this.currency}`;
  }

  // Convert to JSON (for blockchain storage)
  public toJSON() {
    return {
      id: this.id,
      donor: this.donor,
      amount: this.amount,
      currency: this.currency,
      purpose: this.purpose,
      timestamp: this.timestamp.toISOString(),
      verified: this.verified,
    };
  }

  // Recreate from JSON (when loading from blockchain)
  static fromJSON(json: any): Donation {
    const donation = new Donation({
      donor: json.donor,
      amount: json.amount,
      currency: json.currency,
      purpose: json.purpose,
      verified: json.verified,
    });
    donation.id = json.id;
    donation.timestamp = new Date(json.timestamp);
    return donation;
  }
}
