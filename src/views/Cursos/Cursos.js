
import PrimarySearchAppBar from "../../componentes/NavNarGeneral/NavBar";
import CustomSeparator from "../../componentes/Breadcrumb/Breadcrumb";
import ResponsiveGrid from "../../componentes/Grid/Grid";
import FilterBar from "../../componentes/FilterBar/FilterBar";

export default function Cursos() {
  return (
    <>
    <PrimarySearchAppBar />
    <CustomSeparator > Cursos </CustomSeparator>  
    <FilterBar > </FilterBar> 
    <ResponsiveGrid > </ResponsiveGrid> 
    </>
  );
}
