import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
<FiPlusCircle />;
import { FiMinusCircle } from "react-icons/fi";
<FiMinusCircle />;

const Page = ({ data }) => {
  const [cart, setCart] = useState({});
  // console.log("beforereturn cart", cart);

  const ObjConverter = (obj) => {
    const tab = [];
    for (let keys in obj) {
      if (obj.hasOwnProperty(keys)) {
        tab.push([keys, obj[keys][0], obj[keys][1]]);
      }
    }
    return tab;
  };

  const totalfunc = (tab) => {
    let tot = 0;
    for (let i = 0; i < tab.length; i++) {
      tot += tab[i][1] * tab[i][2];
    }
    return tot;
  };

  console.log(cart);
  // console.log(ObjConverter(cart));
  // console.log(totalfunc(ObjConverter(cart)));
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
            {/* Première div pour séparer le bloc de gauche du aside */}
            <div style={{ display: "flex", gap: 20 }}>
              {/* Bloc de gauche en flexbox pour chacune des category*/}
              <div
                style={{ display: "flex", flexDirection: "column", flex: 1 }}
              >
                {data.data.categories.map((category, index) => {
                  //   {console.log(elem.name);}
                  if (category.meals.length !== 0) {
                    return (
                      <div key={index} className="tower">
                        <h2>{category.name}</h2>
                        <div className="wrapper">
                          {category.meals.map((meal, index2) => {
                            return (
                              <article
                                key={index2}
                                className="meal"
                                onClick={() => {
                                  if (cart[meal.title]) {
                                    const obj = { ...cart };
                                    obj[meal.title][0] += 1;
                                    setCart(obj);
                                    // console.log("obj", obj);
                                    // console.log("cart", cart);
                                  } else {
                                    const obj = { ...cart };
                                    obj[meal.title] = [1, meal.price * 1];
                                    setCart(obj);
                                    // console.log("obj", obj);
                                    // console.log("cart", cart);
                                  }
                                }}
                              >
                                <div>
                                  <p className="mealname">{meal.title}</p>
                                  {meal.description && (
                                    <p className="mealdescription">
                                      {meal.description}
                                    </p>
                                  )}
                                  <p className="price">
                                    {meal.price} €{" "}
                                    {meal.popular && "Populaire !"}
                                  </p>
                                </div>
                                {meal.picture && (
                                  <img
                                    src={meal.picture}
                                    alt={"Meal" + index2}
                                  />
                                )}
                              </article>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
              {Object.keys(cart).length === 0 ? (
                <aside>
                  <div id="emptycarttitle">Valider mon panier</div>
                  <p id="emptycarttext">Votre panier est vide</p>
                </aside>
              ) : (
                <aside>
                  <div>Valider mon panier</div>
                  {ObjConverter(cart).map((elem, index) => {
                    return (
                      <div className="cartLine" key={index}>
                        <span>
                          <FiMinusCircle
                            style={{ color: "#00CEBD" }}
                            onClick={() => {
                              let obj = { ...cart };
                              if (elem[1] === 1) {
                                delete obj[elem[0]];
                              } else {
                                obj[elem[0]][0] -= 1;
                              }
                              setCart(obj);
                              // console.log(obj);
                            }}
                          />
                          {elem[1]}
                          <FiPlusCircle
                            style={{ color: "#00CEBD" }}
                            onClick={() => {
                              let obj = { ...cart };
                              // console.log("obj", obj);
                              // console.log("elem0", elem[0]);
                              obj[elem[0]][0] += 1;
                              setCart(obj);
                              // console.log(obj);
                            }}
                          />
                          {elem[0]}
                        </span>
                        <span
                          style={{
                            // flex: 1,
                            flexShrink: 0,
                          }}
                        >
                          {(elem[1] * elem[2]).toFixed(2)} €
                        </span>
                      </div>
                    );
                  })}
                  <div className="subtot">
                    <p>
                      <span>Sous-total</span>{" "}
                      <span>{totalfunc(ObjConverter(cart)).toFixed(2)} €</span>
                    </p>
                    <p>
                      <span>Frais de Livraison</span> <span>2.50 €</span>
                    </p>
                  </div>
                  <p id="total">
                    <span>Total</span>{" "}
                    <span>
                      {(totalfunc(ObjConverter(cart)) + 2.5).toFixed(2)} €
                    </span>
                  </p>
                </aside>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Page;
