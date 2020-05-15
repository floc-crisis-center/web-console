export class Bot {
  id: string;
  name: string;
  description: string;
  generated: boolean;
  published: boolean;

  constructor(item) {
    if (item) {
      this.id = item.id;
      this.name = item.name;
      this.description = item.description;
      this.generated = item.generated;
    }
  }
}
