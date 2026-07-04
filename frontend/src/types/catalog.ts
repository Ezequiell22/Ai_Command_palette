export interface CatalogItem {
  id: number;
  module: string;
  category: string;
  title: string;
  description: string;
  aliases: string[];
  keywords: string[];
  route: string;
  component: string;
  permission: string;
}
