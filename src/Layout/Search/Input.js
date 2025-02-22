import React, { useState, useEffect } from "react";
import tw from "twin.macro";

import SearchIcon from "./icon/search.svg";

// Этот запрос пока для теста
const query = {
    query: `query searchProduct($title: String!) {
                searchProduct(title: $title) {
                ...ProductFields
                }
            }

            fragment ProductFields on Product {
                id
                title
                fullTitle
            }
        `,
    variables: {
        title: "Капецитабин",
    },
};

function SearchInput() {
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const handleChange = (event) => {
        setSearchValue(event.target.value);
    };
    useEffect(() => {
        const results = items.filter((item) =>
            item.name.toLowerCase().includes(searchValue)
        );
        fetch("http://localhost:4000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Accept: "application/json",
            },
            body: JSON.stringify(query),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
            });
        setSearchResults(searchValue.length >= 3 ? results : []);
    }, [searchValue]);
    return (
        <SearchInputLayout>
            <Container className="group">
                <Control>
                    <Label htmlFor="search">Search</Label>
                    <Relative onBlur={searchSuggestHide}>
                        <IconWrapper>
                            <Icon>
                                <SearchIcon />
                            </Icon>
                        </IconWrapper>
                        <Input
                            id="search"
                            name="search"
                            placeholder="Search"
                            type="search"
                            value={searchValue}
                            onChange={(ev) => handleChange(ev)}
                        />
                    </Relative>
                </Control>
                <Button>Искать</Button>
                <ul>
                    {searchResults.map((item) => (
                        <li key={item.id}>
                            {item.name} - {item.cost}
                        </li>
                    ))}
                </ul>
            </Container>
            <BadgeLayout>
                <BadgesTitle>Популярные запросы</BadgesTitle>
                <FilterBadges>
                    <Badge>Нурофен</Badge>
                    <Badge>Ксалерто</Badge>
                    <Badge>Детралекс</Badge>
                    <Badge>Кагоцел</Badge>
                    <Badge>Канкор</Badge>
                    <Badge>Ингавирин</Badge>
                </FilterBadges>
            </BadgeLayout>
            <DescriptionLayout>
                WebRX собрал тысячи аптек и ветклиник. Только проверенные
                компании с лицензией. Мы помогаем людям по всей стране.
            </DescriptionLayout>
        </SearchInputLayout>
    );
}

function searchSuggestResult(ev) {
    console.log("In focus type");
    console.log(ev.target.value);
}
function searchSuggestHide() {
    console.log("It disappeared ");
}

const SearchInputLayout = tw("div")`bg-yellow-300 px-4 sm:px-6 lg:px-8 py-2`;
const Container = tw("div")`
    max-w-3xl
    mx-auto
    grid
    grid-cols-12
    grid-rows-2
    sm:grid-rows-none
    gap-y-4
    sm:gap-y-0
`;

const DescriptionLayout = tw("div")`
    flex
    justify-center
    px-3
    py-3
    font-medium
`;

const BadgeLayout = tw("div")`
    hidden
    sm:flex
    flex-col
    py-4
    max-w-3xl
    mx-auto
`;

const BadgesTitle = tw("div")`
    flex
    mt-5
    mb-3
    text-lg
    font-medium
`;

const FilterBadges = tw("div")`
    flex
    flex-col
    space-y-4
    sm:space-y-0
    sm:flex-row
    sm:space-x-4
`;

const Badge = tw("span")`
    inline-flex
    items-center
    px-3
    py-0.5
    rounded-full
    text-sm
    font-medium
    bg-blue-100
    text-blue-800
    cursor-pointer
`;

const Button = tw("a")`
    col-start-5
    col-end-9
    sm:col-span-2
    inline-flex
    items-center
    justify-center
    px-4
    py-2
    border
    border-transparent
    text-sm
    font-medium
    rounded-r-md
    rounded-l-md
    sm:rounded-l-none
    shadow-sm
    text-white
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
    xl:col-span-2
    bg-black
    cursor-pointer
    hover:bg-white
    hover:text-black
`;

const Icon = tw("div")`h-5 w-5 text-gray-400`;

const Control = tw("div")`
    col-span-12
    sm:col-span-10
`;
const Label = tw("label")`sr-only`;
const Relative = tw("div")`relative`;

const IconWrapper = tw(
    "div"
)`pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center`;

const Input = tw("input")`
    block
    w-full
    bg-white
    border
    border-gray-300
    rounded-l-md
    rounded-r-md
    sm:rounded-r-none
    py-4
    pl-10
    pr-3
    text-sm
    placeholder-gray-500
    focus:outline-none
    focus:text-gray-900
    focus:placeholder-gray-400
    focus:ring-1
    sm:text-sm
`;

export default SearchInput;
