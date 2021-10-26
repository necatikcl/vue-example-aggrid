# Frontend - Round 2 - Case

Öncelikle ilanımıza olan ilginiz için teşekkürler! Bu proje mülakatında, projede en çok değer verdiğimiz konular olan: clean / readable code & performance konularındaki performansınızı da görerek sizi daha yakından tanımak istiyoruz.

# **Ne bekliyoruz?**

- Size ilettiğimiz Figma dosyasında yer alan tasarımı, Vue kullanarak olabildiğince tasarımdaki stile uygun biçimde hazırlamanızı rica ediyoruz. Tasarımda bulunan grid içerisinde, sayfalandırma yapılarını size vereceğim API uçlarını kullanarak grid’i her sayfada 20 sonuç gösterecek şekilde çalıştırmanızı rica ediyoruz.
- Bu grid içerisinde, arama detayları tıklandığında ise, yeni bir modal açarak ilgili kelimenin 12 aylık arama hacmini bu modal'da göstermenizi rica ediyoruz.
- Hazırladığınız projeyi sizinle paylaştığımız GitHub repo'suna göndermenizi ve Surge, Netlify, Vercel ya da sizin seçtiğiniz herhangi bir frontend deployment servisini kullanarak canlıya almanızı rica ediyoruz.
- Tüm bu süreçte, sadece verilen brief’e bağlı kalmadan size ait yetenekleri görebileceğimiz detayları mümkün olduğunca projeye eklemeniz her zaman için bizim tarafımızda pozitif değerler olacak.

# **Ne kullanmalısınız?**

- Bu projeyi Vue 3 kullanarak hazırlamanızı rica ediyoruz.
- Biz grid için AG Grid kullanıyoruz. Performans ve özelleştirilebilirlik açısından sizin de trial license ile AG Grid kullanmanızı rica ediyoruz.
- Biz veri görselleştirme için Apex Charts kullanıyoruz ve sizin de kullanmanızı tercih ederiz. Ancak deneyimli olduğunuz başka bir kütüphane varsa varolan tasarımı en yakın biçimde gösterebilecek alternatifleri kullanabilir, D3.js ile kendi grafiğinizi oluşturabilirsiniz.
- Verileri listelediğimiz grid’de pagination ile yirmişerli gösterim yapmanıza uygun bir tasarım yaptık. Buna uygun istekler atabilmeniz için API’de ilgili alanları tanımladık.
- İki değerlendirme kriterimiz olacak, öncelikle grid’i ne kadar tasarıma benzer biçimde özelleştirebildiğinizi görmek istiyoruz. İkinci kriterimiz ise, bu süreçteki özel alanlarda kullandığınız kodun ne kadar performanslı çalıştığı yönünde olacak. Üçüncü parti kütüphaneleri her zaman kullanabilirsiniz. En önemli önceliğimiz performanslı, kolay okunabilen kodu denetlemek.

# **Ekstra neler yapabilirim?**

Aşağıda listelediğimiz tüm konular, ek vaktiniz kalırsa, farkınızı daha fazla öne çıkarmak isterseniz opsiyonel olarak yapabilirsiniz. Bunu zorunlu tutmuyoruz ancak bu listeden bir ya da bir kaç özelliği uygulamasına katmış arkadaşların daha avantajlı olduğunu söyleyebiliriz :) *(lütfen yanıtınızla beraber, varsa buradan eklediğiniz özellikleri de belirtebilirsiniz)*

- Projeyi TypeScript kullanarak hazırlamak
- Projeyi server-side rendering ile hazırlamak
- Grafiği modal olarak açmayıp, gridi'n alt satırlarını kaydırarak göstermek
- CSS animasyonları & responsive design
- Uygulamaya dark mode / light mode özelliği eklemek
- Auth0 veya benzeri bir login library’si
- Ag Grid server-side row model uygulaması ile infinite scroll
- Ag Grid filtering options
- Ag Grid pivot table options
- Ag Grid keyboard navigation
- Ag Grid data export features
- Ag Grid integrated charts

Şimdilik ekleyeceklerimiz bu kadar! Sormak istediğiniz her türlü soruda Telegram’da [@yigit35](https://t.me/yigit35) üzerinden veya [yigit@seo.do](mailto:yigit@seo.do) üzerinden yardımcı olmak için hazır olduğumu bilmenizi isterim.

Mülakat nasıl sonuçlanırsa sonuçlansın, ücretsiz olarak hazırladığınız bu projeyi şirket belirtmeden open-source yayınlamanızda *(credentials’ları repo’da gösterememek koşuluyla)* bizim için hiçbir mahsur yok :)

## **Figma (Design Source File)**

Bunu Figma dosyaya katılanların isimlerini katılımcılarla paylaştığı için gizliliğiniz adına, link olarak değil dosya olarak paylaşıyoruz.

[https://www.dropbox.com/s/p49s79pzcm8btwi/Zeo%20-%20Frontend%20Interview.fig](https://www.dropbox.com/s/p49s79pzcm8btwi/Zeo%20-%20Frontend%20Interview.fig)

## **1. API Request for Table Data**

### **Endpoint:**

**`POST`** `https://jupiter.seo.do/front-interview/list_keyword_info_for_domain`

### **Body Parameters for Request:**

```json
{
  "firstDate": "2020-02-20",
  "lastDate": "2020-02-25",
  "domain": "akakce.com",
  "limit": 10,
  "page": 3
}
```

### **Example Request in cURL:**

```bash
curl --location --request POST 'https://jupiter.seo.do/front-interview/list_keyword_info_for_domain' \
--header 'Content-Type: application/json' \
--data-raw '{"firstDate": "2020-02-20", "lastDate": "2020-02-25", "domain": "akakce.com", "limit": 10, "page": 3}'
```

## **2. API Request for Search Volume of Keyword**

### **Endpoint:**

**`POST`** `https://jupiter.seo.do/front-interview/get_specific_search_volume`

### **Body Parameters for Request:**

```json
{
  "keyword": "ankara",
  "country": "tr",
  "lang": "tr"
}
```

### **Example Request in cURL:**

```bash
curl --location --request POST 'https://jupiter.seo.do/front-interview/get_specific_search_volume' \
--header 'Content-Type: application/json' \
--data-raw '{"keyword": "ankara", "country": "tr", "lang": "tr"}'
```
