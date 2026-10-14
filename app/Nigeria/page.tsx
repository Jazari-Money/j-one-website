import { CountryPage } from "../countries/CountryPage";
import { countryMetadata } from "../countries/metadata";
export const metadata = countryMetadata("Nigeria");
export default function NigeriaPage() { return <CountryPage country="Nigeria" />; }
