const Page = ({ data }) => {
  return (
    <>
      <header>
        <div className="container">
          <img src="src/assets/logo-teal.svg" alt="logo-deliveroo" />
        </div>
      </header>

      <main>
        <section className="firstsection container">
          <div>
            <h1>{data.data.restaurant.name}</h1>
            <p>{data.data.restaurant.description}</p>
          </div>
          <img src={data.data.restaurant.picture} alt="restaurant" />
        </section>
        <section className="secondsection">
          <div className="container">
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {data.data.categories.map((category, index) => {
                  //   {console.log(elem.name);}
                  return (
                    <div key={index} className="tower">
                      <h2>{category.name}</h2>
                      <div className="wrapper">
                        {category.meals.map((meal, index2) => {
                          return (
                            <div key={index2} className="meal">
                              <div>
                                <p className="mealname">{meal.title}</p>
                                <p className="mealdescription">
                                  {meal.description}
                                </p>
                                <p className="price">
                                  {meal.price} € {meal.popular && "Populaire !"}
                                </p>
                              </div>
                              {meal.picture && (
                                <img src={meal.picture} alt={"Meal" + index2} />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* <aside id="aside">
                <p>bla</p>
              </aside> */}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Page;
