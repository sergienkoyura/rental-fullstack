import { Carousel } from "./components/Carousel";
import { ExploreTopItems } from "./components/ExploreTopItems";
import { Heros } from "./components/Heros";
import { Services } from "./components/Services";


export const HomePage = () => {
    return (
        <>
            <ExploreTopItems />
            <Carousel />
            <Heros />
            <Services />
        </>
    );
}