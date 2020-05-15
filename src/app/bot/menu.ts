export class Menu {
  id: string;
  welcome_message: string;
  main_menu_message: string;
  main_menu_options_count: number;

  constructor(item) {
    if (item) {
      this.id = item.id;
      this.welcome_message = item.welcome_message.replace(/\n/g, '<br>');
      this.main_menu_message = item.main_menu_message.replace(/\n/g, '<br>');
      this.main_menu_options_count = item.main_menu_options_count;
    }
  }
}
