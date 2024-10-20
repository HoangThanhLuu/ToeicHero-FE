import { Component } from '@angular/core';

@Component({
  selector: 'app-crawl-config',
  templateUrl: './crawl-config.component.html',
  styleUrls: ['./crawl-config.component.scss']
})
export class CrawlConfigComponent {
  title: string = "Crawl Config";
  currentPage: string = "Config";

  dataSet = [
    {
      id: '1',
      email: 'lethithanhtuyet1822@gmail.com',
      token:'_ym_uid=1693896319292407001; csrftoken=9ffuwmTq296Q2jb0IcPRJUzUGfJlsykbkuUAtgm1u5SwljPTVu7zWoYzoAQRIcQb; sessionid=ell5ltuwsz24mwlut8hdj9ptpv6o335f; _fbc=fb.1.1699674812686.IwAR1meZZ-y20KiBJFyLHGrsPLa1MLZYF4NwyPRYA7vvraT6jtzvyf54kVug0; _fbp=fb.1.1699674812688.1026620336; _ym_d=1711944608; _gid=GA1.2.943165795.1712056173; cf_clearance=u8vX.63VhQpXGi_QxGowI0.Ihgr8NzcIS6JYYY_2T0w-1712056175-1.0.1.1-xPXUd.MzQHB1lpfd33qkcgWlVrxTxZ.AAZVoXsutd7nKEB60yNBOaw5z2OTsFKz7ShX5QGS5CukFs3WSVb38LQ; _ym_isad=2; _ga=GA1.1.1827084423.1693896316; _ga_64Z8KN7V8D=GS1.1.1712128487.18.1.1712129362.0.0.0',
      agent_user: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    },
    {
      id: '2',
      email: 'lethithanhtuyet1822@gmail.com',
      token:'_ym_uid=1693896319292407001; csrftoken=9ffuwmTq296Q2jb0IcPRJUzUGfJlsykbkuUAtgm1u5SwljPTVu7zWoYzoAQRIcQb; sessionid=ell5ltuwsz24mwlut8hdj9ptpv6o335f; _fbc=fb.1.1699674812686.IwAR1meZZ-y20KiBJFyLHGrsPLa1MLZYF4NwyPRYA7vvraT6jtzvyf54kVug0; _fbp=fb.1.1699674812688.1026620336; _ym_d=1711944608; _gid=GA1.2.943165795.1712056173; cf_clearance=u8vX.63VhQpXGi_QxGowI0.Ihgr8NzcIS6JYYY_2T0w-1712056175-1.0.1.1-xPXUd.MzQHB1lpfd33qkcgWlVrxTxZ.AAZVoXsutd7nKEB60yNBOaw5z2OTsFKz7ShX5QGS5CukFs3WSVb38LQ; _ym_isad=2; _ga=GA1.1.1827084423.1693896316; _ga_64Z8KN7V8D=GS1.1.1712128487.18.1.1712129362.0.0.0',
      agent_user: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    },
    {
      id: '3',
      email: 'lethithanhtuyet1822@gmail.com',
      token:'_ym_uid=1693896319292407001; csrftoken=9ffuwmTq296Q2jb0IcPRJUzUGfJlsykbkuUAtgm1u5SwljPTVu7zWoYzoAQRIcQb; sessionid=ell5ltuwsz24mwlut8hdj9ptpv6o335f; _fbc=fb.1.1699674812686.IwAR1meZZ-y20KiBJFyLHGrsPLa1MLZYF4NwyPRYA7vvraT6jtzvyf54kVug0; _fbp=fb.1.1699674812688.1026620336; _ym_d=1711944608; _gid=GA1.2.943165795.1712056173; cf_clearance=u8vX.63VhQpXGi_QxGowI0.Ihgr8NzcIS6JYYY_2T0w-1712056175-1.0.1.1-xPXUd.MzQHB1lpfd33qkcgWlVrxTxZ.AAZVoXsutd7nKEB60yNBOaw5z2OTsFKz7ShX5QGS5CukFs3WSVb38LQ; _ym_isad=2; _ga=GA1.1.1827084423.1693896316; _ga_64Z8KN7V8D=GS1.1.1712128487.18.1.1712129362.0.0.0',
      agent_user: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  ];
}
