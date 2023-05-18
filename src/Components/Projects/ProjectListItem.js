import './ProjectListItem.css';
import YTlogo from './Thumbnails/youtube.png';
import GitLogo from './Thumbnails/github.png';

export default function ProjectListItem(row) {
    const rowData = row.data;
    
    const image = require("./Thumbnails/" + rowData.Id + ".png");
    const technologies = rowData.Technologies.replaceAll(", ", ",").split(",");
    const urls = rowData.URL.replaceAll(", ", ",").split(",");

    var techList = technologies.map(function(tech) {
        return (
            <li class="TechLi">{tech}</li>
        );
    });
    var urlList = urls.map(function(url) {
        if (url != "") {
            const hostname = new URL(url).hostname.replace("www.", "");

            if (hostname == "youtu.be" || hostname == "youtube.com") {
                return (
                    <li class="UrlLi">
                        <a href={url} class="logo"><img src={YTlogo} /></a>
                    </li>
                );
            }
            else if (hostname == "github.com") {
                return (
                    <li class="UrlLi">
                        <a href={url} class="logo"><img src={GitLogo} /></a>
                    </li>
                );
            }
        }
    });


    return (
        <li class="liItem projectItem" key={rowData.Id}>
            <h1 class="heading">{rowData.Title}</h1>
            <p class="subheading"><i>{rowData.Type} | {rowData.Category}</i></p>
            <ul className='TechList'>
                {techList}
                {urlList}
            </ul>
            <p class="description">{rowData.Description}</p>
            <img class="DescImg" src={image} />
        </li>
    )
}
