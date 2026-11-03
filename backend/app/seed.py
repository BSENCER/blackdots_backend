from datetime import datetime

from sqlalchemy import select

from .database import Base, SessionLocal, engine
from .models import (
    AppItem,
    Application,
    Blog,
    FAQ,
    Industry,
    Message,
    Partner,
    Phase,
    Service,
    TeamMember,
    Testimonial,
    Vacancy,
)


def seed() -> None:
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        if db.scalar(select(Phase.id).limit(1)):
            print("Database already contains data; seed skipped.")
            return
        db.add_all(
            [
                Phase(id="phase-1", title="Analiz", subtitle="Biznesinizi tanıyırıq", description="Mövcud prosesləri və məqsədləri təhlil edirik.", icon="🔎", points=["Müsahibələr", "Proses xəritəsi"], buttonText="Ətraflı", order=1),
                Phase(id="phase-2", title="Planlaşdırma", subtitle="Uyğun həll hazırlayırıq", description="Odoo üçün aydın və ölçülə bilən yol xəritəsi yaradırıq.", icon="🗺️", points=["Prioritetlər", "Yol xəritəsi"], buttonText="Əlaqə saxla", order=2),
                Phase(id="phase-3", title="İmplementasiya", subtitle="Sistemi işə salırıq", description="Modulları qurur, məlumatları köçürür və komandanı öyrədirik.", icon="🚀", points=["Konfiqurasiya", "Təlim"], buttonText="Başlayaq", order=3),
            ]
        )
        db.add_all([
            Service(id="service-1", title="İmplementasiya", icon="⚙️", description="Odoo-nun peşəkar quraşdırılması və konfiqurasiyası.", order=1),
            Service(id="service-2", title="Fərdiləşdirmə", icon="🔧", description="Biznesinizə uyğun xüsusi modul və funksiyalar.", order=2),
            Service(id="service-3", title="Miqrasiya", icon="🚀", description="Mövcud sistemdən Odoo-ya təhlükəsiz keçid.", order=3),
        ])
        db.add_all([
            Partner(id="partner-1", name="Odoo", type="partner", logo="", order=1),
            Partner(id="client-1", name="BlackDots müştərisi", type="client", logo="", order=2),
            Partner(id="partner-2", name="Azərbaycan Texnologiya Partnyoru", type="partner", logo="", order=3),
        ])
        db.add_all([
            TeamMember(id="team-1", name="BlackDots komandası", position="Odoo mütəxəssisləri", bio="Bizneslərin rəqəmsal inkişafına kömək edirik.", order=1),
            TeamMember(id="team-2", name="Aysel Əliyeva", position="Layihə meneceri", bio="Müştərilər üçün aydın yol xəritələri hazırlayır.", order=2),
            TeamMember(id="team-3", name="Murad Hüseynov", position="Texniki rəhbər", bio="Etibarlı və ölçülə bilən texniki həllər qurur.", order=3),
        ])
        db.add_all([
            Industry(id="industry-1", name="Pərakəndə", icon="🛒", description="Satış və inventar prosesləri.", order=1),
            Industry(id="industry-2", name="Xidmətlər", icon="💼", description="Xidmət şirkətləri üçün həllər.", order=2),
            Industry(id="industry-3", name="İstehsalat", icon="🏭", description="İstehsal və planlaşdırma prosesləri.", order=3),
        ])
        db.add_all([
            AppItem(id="app-1", name="CRM", category="Satış", icon="📈", description="Müştəri münasibətlərini idarə edin.", features=["Fürsətlər", "Satış hunisi"], order=1),
            AppItem(id="app-2", name="Inventory", category="Əməliyyatlar", icon="📦", description="Anbar və inventarı izləyin.", features=["Anbarlar", "Marşrutlar"], order=2),
            AppItem(id="app-3", name="Accounting", category="Maliyyə", icon="💰", description="Maliyyə əməliyyatlarını avtomatlaşdırın.", features=["Fakturalar", "Hesabatlar"], order=3),
        ])
        db.add_all([
            Testimonial(id="testimonial-1", author="Rəşad Məmmədov", position="CEO, TechCorp Azerbaijan", quote="BlackDots ilə işləmək böyük təcrübə oldu.", order=1),
            Testimonial(id="testimonial-2", author="Leyla Əliyeva", position="Direktor, RetailPlus", quote="Peşəkar komanda və əla texniki dəstək.", order=2),
            Testimonial(id="testimonial-3", author="Kamran Quliyev", position="Təsisçi, Nova Group", quote="Proseslərimiz daha şəffaf və sürətli oldu.", order=3),
        ])
        db.add_all([
            Blog(id="blog-1", title="Odoo ilə biznesin rəqəmsallaşdırılması", slug="odoo-ile-biznesin-reqemsallasdirilmasi", author="BlackDots", date=datetime.utcnow(), readTime="5 dəq", category="Odoo", icon="🚀", excerpt="Odoo biznes proseslərini vahid platformada birləşdirir.", content="Odoo biznes proseslərini vahid platformada birləşdirir.", order=1),
            Blog(id="blog-2", title="ERP seçərkən nələrə diqqət etməli?", slug="erp-secerken-nelere-diqqet-etmeli", author="BlackDots", date=datetime.utcnow(), readTime="4 dəq", category="Məsləhətlər", icon="💡", excerpt="Doğru ERP platformasını seçmək üçün əsas meyarlar.", content="ERP seçimi biznes məqsədləri və inkişaf planı ilə uyğun olmalıdır.", order=2),
            Blog(id="blog-3", title="Odoo modulları ilə məhsuldarlıq", slug="odoo-modullari-ile-mehsuldarliq", author="BlackDots", date=datetime.utcnow(), readTime="6 dəq", category="Məhsuldarlıq", icon="📈", excerpt="Komandanız üçün ən faydalı Odoo modulları.", content="Modul yanaşma biznesə ehtiyac olduqca böyüməyə imkan verir.", order=3),
        ])
        db.add_all([
            FAQ(id="faq-1", question="Odoo nədir?", answer="Odoo biznes proseslərini idarə etmək üçün modul ERP platformasıdır.", order=1),
            FAQ(id="faq-2", question="İmplementasiya nə qədər çəkir?", answer="Müddət biznesin ölçüsündən və seçilən modullardan asılıdır.", order=2),
            FAQ(id="faq-3", question="Məlumatlar təhlükəsizdirmi?", answer="Məlumatların təhlükəsizliyi üçün giriş nəzarəti və ehtiyat nüsxələmə tətbiq olunur.", order=3),
        ])
        db.add_all([
            Vacancy(id="vacancy-1", title="Odoo developer", type="Tam Vaxt", location="Bakı", salary="Razılaşma ilə", experience="2+ il", description="Odoo modullarının hazırlanması və dəstəklənməsi.", order=1),
            Vacancy(id="vacancy-2", title="Layihə meneceri", type="Tam Vaxt", location="Bakı", salary="Razılaşma ilə", experience="2+ il", description="Odoo layihələrinin planlaşdırılması və idarə edilməsi.", order=2),
            Vacancy(id="vacancy-3", title="Biznes analitik", type="Yarım Vaxt", location="Hibrid", salary="Razılaşma ilə", experience="1+ il", description="Müştəri proseslərinin təhlili və sənədləşdirilməsi.", order=3),
        ])
        db.add_all([
            Message(id="message-1", name="Nigar Məmmədova", email="nigar@example.com", company="Nova", phone="+994500000001", service="implementation", message="Odoo haqqında məlumat almaq istəyirəm.", read=False),
            Message(id="message-2", name="Elvin Əliyev", email="elvin@example.com", company="Retail", phone="+994500000002", service="support", message="Dəstək xidmətləri ilə maraqlanıram.", read=True),
            Message(id="message-3", name="Samirə Quliyeva", email="samira@example.com", company="Group", phone="+994500000003", service="consulting", message="Məsləhət görüşü təyin etmək istəyirəm.", read=False),
        ])
        db.add_all([
            Application(id="application-1", vacancyId="vacancy-1", name="Tural Həsənov", email="tural@example.com", phone="+994500000004", experience=3, coverLetter="Odoo ilə üç il işləyirəm.", status="pending"),
            Application(id="application-2", vacancyId="vacancy-2", name="Zəhra Rzayeva", email="zahra@example.com", phone="+994500000005", experience=4, coverLetter="Layihə idarəetməsi üzrə təcrübəm var.", status="reviewed"),
            Application(id="application-3", vacancyId="vacancy-3", name="Orxan Məlikov", email="orxan@example.com", phone="+994500000006", experience=2, coverLetter="Biznes analitikası ilə məşğulam.", status="pending"),
        ])
        db.commit()
        print("Seed data created.")


if __name__ == "__main__":
    seed()
