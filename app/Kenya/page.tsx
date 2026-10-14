import { CountryPage } from "../countries/CountryPage";
import { countryMetadata } from "../countries/metadata";
export const metadata = countryMetadata("Kenya");
export default function KenyaPage() { return <CountryPage country="Kenya" />; }
