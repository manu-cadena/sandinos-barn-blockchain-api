interface Purpose {
  category: string;
  description: string;
  amount: number;
}

export default class Donation {
  public id: string;
  public donor: string;
  public amount: number;
  public currency: string;
  public purposes: Purpose[];
  public timestamp: Date;
  public verified: boolean;

  constructor({
    donor,
    amount,
    currency = 'SEK',
    purposes,
    verified = false,
  }: {
    donor: string;
    amount: number;
    currency?: string;
    purposes: Purpose[];
    verified?: boolean;
  }) {
    this.id = this.generateId();
    this.donor = donor;
    this.amount = amount;
    this.currency = currency;
    this.purposes = purposes;
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
    if (!this.donor || this.donor.length === 0) return false;
    if (!this.amount || this.amount <= 0) return false;
    if (!this.purposes || !Array.isArray(this.purposes) || this.purposes.length === 0) return false;
    
    // Validate each purpose
    for (const purpose of this.purposes) {
      if (!purpose.category || purpose.category.length === 0) return false;
      if (!purpose.description || purpose.description.length === 0) return false;
      if (!purpose.amount || purpose.amount <= 0) return false;
    }
    
    // Validate that sum of purpose amounts equals total amount
    const totalPurposeAmount = this.purposes.reduce((sum, purpose) => sum + purpose.amount, 0);
    return Math.abs(totalPurposeAmount - this.amount) < 0.01; // Allow for small floating point differences
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
      purposes: this.purposes,
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
      purposes: json.purposes,
      verified: json.verified,
    });
    donation.id = json.id;
    donation.timestamp = new Date(json.timestamp);
    return donation;
  }

  // Get breakdown of purposes
  public getPurposeBreakdown(): string {
    return this.purposes
      .map(p => `${p.category}: ${p.description} (${p.amount} ${this.currency})`)
      .join(', ');
  }

  // Get purposes by category
  public getPurposesByCategory(): { [category: string]: Purpose[] } {
    return this.purposes.reduce((acc, purpose) => {
      if (!acc[purpose.category]) {
        acc[purpose.category] = [];
      }
      acc[purpose.category].push(purpose);
      return acc;
    }, {} as { [category: string]: Purpose[] });
  }
}
