import getAudiobooksByTitle from "@/actions/getAudiobooksByTitle";
import Header from "@/components/Header";
import SeachInput from "@/components/SearchInput";
import SearchContent from "./components/SearchContent";

interface SearchProps{
    searchParams:{
        title:string;

    }
}
export const revalidate=0;
const Search= async ({searchParams}:SearchProps)=>{
    const audiobooks= await getAudiobooksByTitle(searchParams.title);
    return (<div className="
    bg-neutral-900
    rounded-lg
    h-full
    w-full
    overflow-hidden
    overflow-y-auto

    ">
        <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6 ">
            <h1 className="text-white text-3xl font-semibold ">
                Search deez nuts!
            </h1>
            <SeachInput/>

        </div>

        </Header>
        <SearchContent audiobooks={audiobooks}/>
       
    </div>)

}
export default Search;