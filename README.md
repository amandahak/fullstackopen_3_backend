https://fullstackopen-3-ves5.onrender.com

# Full Stack Open 3:n osan backend -repository

* [Linkki kurssialustalle](https://fullstackopen.com/)
* [Kurssin 0. 1. ja 2. osuuksien repository](https://github.com/amandahak/fullstackopen_ah)
* [3. osan frontendin repository](https://github.com/amandahak/fullstackopen_3_frontend)
* [render-sivusto](https://fullstackopen-3-ves5.onrender.com)

Kurssilla tutustutaan JavaScriptilla tapahtuvaan moderniin web-sovelluskehitykseen. 
Pääpaino on React-kirjaston avulla toteutettavissa single page ‑sovelluksissa ja niitä tukevissa Node.js:llä toteutetuissa REST- ja GraphQL-rajapinnoissa. 
Kurssi sisältää myös osat, joissa tutustutaan TypeScriptiin, React Nativeen ja jatkuvaan integraatioon.

Kurssilla käsitellään myös sovellusten testaamista, konttiteknologiaa, konfigurointia ja suoritusympäristöjen hallintaa sekä tietokantoja.

## Osa 3

### Osa-alueet  

* Node.js ja Express
* Sovellus internetiin
* Tietojen tallentaminen MongoDB-tietokantaan
* Validointi ja ESLint


## Puhelinluettelo Backend

Tämä on yksinkertainen Node.js- ja Express-pohjainen sovellus, joka tarjoaa puhelinluetteloon liittyviä toimintoja. Sovellus käsittelee HTTP-pyyntöjä, joilla voidaan lisätä, poistaa, hakea ja listata puhelinluettelon henkilöitä.

### Ominaisuudet

- **Listaa kaikki henkilöt:** Saatavilla endpointissa `GET /api/persons`. Palauttaa kaikki puhelinluettelossa olevat henkilöt JSON-muodossa.
- **Näytä yksittäinen henkilö:** Saatavilla endpointissa `GET /api/persons/:id`. Palauttaa tietyn henkilön ID:n perusteella.
- **Lisää uusi henkilö:** Saatavilla endpointissa `POST /api/persons`. Lisää uuden henkilön puhelinluetteloon.
- **Poista henkilö:** Saatavilla endpointissa `DELETE /api/persons/:id`. Poistaa henkilön ID:n perusteella.
- **Näytä luettelon tiedot:** Saatavilla endpointissa `GET /info`. Näyttää puhelinluettelon henkilöiden lukumäärän ja pyyntöhetken ajan.

### Käyttöönotto

1. **Asenna riippuvuudet:**

    ```bash
    npm install
    ```

2. **Käynnistä palvelin:**

    ```bash
    npm start
    ```

    Palvelin käynnistyy oletusarvoisesti portissa 3001.

3. **Käytä dev-käyttötilaa:**

    ```bash
    npm run dev
    ```

    Dev-käyttötilassa palvelin käynnistyy uudelleen automaattisesti koodimuutosten jälkeen.

### Komponentit

#### `app.js`

Tiedosto `app.js` sisältää sovelluksen päälogiikan ja reitit. Tässä tiedostossa määritellään kaikki sovelluksen toiminnallisuudet.

##### Reitit

- **`/api/persons`**
    - `GET`: Palauttaa kaikki puhelinluettelon henkilöt.
    - `POST`: Lisää uuden henkilön puhelinluetteloon. Tarkistaa, että nimi on uniikki ja että sekä nimi että numero on annettu. Generoi satunnaisen id:n.

- **`/api/persons/:id`**
    - `GET`: Palauttaa tietyn henkilön ID:n perusteella. Jos henkilön ID:tä ei löydy, palauttaa virheilmoituksen.
    - `DELETE`: Poistaa henkilön ID:n perusteella.

- **`/info`**
    - `GET`: Näyttää tietoa puhelinluettelosta, mukaan lukien henkilöiden lukumäärän ja pyyntöhetken ajan.


#### JSON-muotoisten pyyntöjen käsittely

- **Express JSON Middleware**
    - Sovellus käyttää `express.json()` -middlewarea JSON-muotoisten pyyntöjen käsittelyyn. Tämä mahdollistaa sen, että sovellus voi vastaanottaa ja käsitellä JSON-dataa.

#### HTTP-pyyntöjen lokitus

- **Morgan Middleware**
    - Sovellus käyttää Morgania HTTP-pyyntöjen lokitukseen. Morgan on konfiguroitu näyttämään pyynnön HTTP-metodi, URL, statuskoodi, vastauksen koko, käsittelyaika sekä POST -pyynnöissä pyynnön mukana tullut data.


### Virheenkäsittely

- Sovellus tarkistaa, että kaikki tarvittavat kentät (nimi ja numero) on täytetty ennen uuden henkilön lisäämistä.
- Jos nimi on jo olemassa puhelinluettelossa, pyyntöä ei suoriteta ja käyttäjä saa virheilmoituksen.

### Linttaus

Tässä projektissa käytetään ESLintia koodin laadun ja tyylin valvomiseksi. Voit tarkistaa koodin tyylivirheet seuraavilla komennoilla:

- **Suorita linttaus:**

    ```bash
    npm run lint
    ```

- **Automaattinen korjaus lint-virheille:**

    ```bash
    npm run lint -- --fix
    ```

### Deploy ja MongoDB

- **Deploy to Render:**
    - Sovellus on otettu käyttöön Renderissä. 

- **MongoDB:**
    - Sovellus käyttää MongoDB:tä tietojen tallentamiseen. MongoDB Atlas on konfiguroitu sovelluksen tietokannaksi. 


## Frontend

**Frontendin Repository:** [Frontendin repository](https://github.com/amandahak/fullstackopen_3_frontend)

Tämä on React-pohjainen single-page application (SPA), joka kommunikoi backendin kanssa REST API:n kautta. 

#### Ominaisuudet

- **Listaa kaikki henkilöt:** Näyttää kaikki puhelinluettelon henkilöt käyttöliittymässä.
- **Näytä yksittäinen henkilö:** Mahdollistaa tietyn henkilön tiedot tarkasteltavaksi.
- **Lisää uusi henkilö:** Käyttäjä voi lisätä uuden henkilön puhelinluetteloon.
- **Poista henkilö:** Käyttäjä voi poistaa henkilön puhelinluettelosta.
- **Näytä luettelon tiedot:** Näyttää puhelinluettelon tilastot ja tiedot.

#### Käyttöönotto

1. **Asenna riippuvuudet:**

    ```bash
    npm install
    ```

2. **Käynnistä kehityspalvelin:**

    ```bash
    npm start
    ```


#### Rakennus ja julkaisu

- **Rakennus tuotantoa varten:**

    ```bash
    npm run build
    ```

    Rakentaa tuotantoversion, joka sijoitetaan `dist`-hakemistoon.
