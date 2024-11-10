import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
    Container,
    Grid,
    Typography,
    Stack,
    CardActions,
    CardContent,
    CardMedia,
    menuIcon,
    Box,
    TextField,
    InputAdornment,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Divider
} from "@mui/material";
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import BaseLayout from "../BaseLayout";
// import TopicMenu from "./TopicMenu";
import SearchIcon from '@mui/icons-material/Search';
import PlaceIcon from '@mui/icons-material/Place';
import ListIcon from '@mui/icons-material/List';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import ListSkeleton8 from '../components/ListSkeleton8';
import Chip from '@mui/material/Chip';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import AddButton from '../components/AddButton';
import OrgLink from '../components/OrgLink';
import Skeleton from '@mui/material/Skeleton';
import ClusteredMap from '../ResourceExchange/ClusteredMap';
import moment from 'moment';
import LexicalEditorView from "../Elearning/LexicalEditorView";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import ExampleTheme from "../../Dashboard/LexicalEditor/themes/ExampleTheme";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import OrganizationContent from '../components/OrganizationContent';
import VolunteerModalButton from '../components/VolunteerModalButton';

function SingleOrganization(props) {

    const postParams = useParams();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState({
        overview: 'Test Overview',
        description: ''
    });
    const [relatedContent, setRelatedContent] = useState([]);
    const [editorInitialConfig, setEditorInitialConfig] = useState([]);
    const [images, setImages] = useState([]);
    const [organization, setOrganization] = useState({
        title: '',
        url: '',
        type: '',
        initial: '',
        primaryContactPerson: '',
        contactDetails: '',
        email: '',
        phone: '',
        logo: '',
    })
    const [profileImage, setProfileImage] = useState(true);
    const [address, setAddress] = useState('');
    const [profLetter, setProfileLetter] = useState('M');
    const [misc, setMisc] = useState({
        addedDate: '',
        profLetter: 'M'
    })
    const [tags, setTags] = useState([]);

    //loaders
    const [loaders, setLoaders] = useState({
        title: true,
        organization: true,
        tags: true,
        locations: true,
        relatedContent: true,
    })

    const orgTypes = [
        'None',
        'CSO/NGO',
        'Academia',
        'Research Institution',
        'Private sector',
        'Media',
        'Donor'
    ];

    useEffect(() => {
        setLoaders({
            title: true,
            organization: true,
            tags: true,
            locations: true,
            relatedContent: true,
        })
        stopLoaders();
        getProjectProfile();
    }, [postParams.slug, localStorage.getItem('auth_id'), description.description]);


    // API Calls
    const getProjectProfile = () => {
        axios.get(`/api/organization/${postParams.slug}`).then(res => {
            if (res.data.status === 200) {
                console.log(res.data.get_data);
                setTitle(res.data.get_data.org_name);
                setDescription({
                    overview: '',
                    description: res.data.get_data.description
                })
                if (res.data.get_data.org_logo == '' || res.data.get_data.org_logo == null) {
                    console.log('There is no profile image');
                    setProfileImage(false);
                    setProfileLetter(res.data.get_data.org_name.charAt(0).toUpperCase())
                    setOrganization({
                        type: res.data.get_data.type,
                        primaryContactPerson: res.data.get_data.contact_person,
                        contactDetails: res.data.get_data.address,
                        email: res.data.get_data.contact_email_focalpoint,
                        phone: res.data.get_data.contact_number,
                    });
                } else {
                    console.log('There is a profile image');
                    setOrganization({
                        logo: JSON.parse(res.data.get_data.org_logo)[0],
                        type: res.data.get_data.type,
                        primaryContactPerson: res.data.get_data.contact_person,
                        contactDetails: res.data.get_data.address,
                        email: res.data.get_data.contact_email_focalpoint,
                        phone: res.data.get_data.contact_number,
                    });
                    handleProfileImage(JSON.parse(res.data.get_data.org_logo)[0]);
                }
                setImages(JSON.parse(res.data.get_data.photos));
                console.log(JSON.parse(res.data.get_data.photos));
                //set tags
                setTags(res.data.get_data.tags);
                // set other data
                const addedDateString = res.data.get_data.created_at;
                const addedFormated = moment(addedDateString).format("YYYY/M/D");
                setMisc({
                    addedDate: addedFormated
                });
                console.log(organization);
                console.log('This is a test');
            }
            else if (res.data.status === 404) {
                console.log(res.message);
            }
        });
    }

    const stopLoaders = () => {
        setTimeout(() => {
            setLoaders({
                title: false,
                organization: false,
                tags: false,
                locations: false,
            });
        }, 2000);
    }

    let editorConfig = {
        theme: ExampleTheme,
        onError(error) {
            throw error;
        },
        nodes: [
            HeadingNode,
            ListNode,
            ListItemNode,
            QuoteNode,
            CodeNode,
            CodeHighlightNode,
            TableNode,
            TableCellNode,
            TableRowNode,
            AutoLinkNode,
            LinkNode
        ],
        editable: false,
    };

    const handleProfileImage = (path) => {
        console.log('WTF');
        console.log('Path is ' + path);
        let img = new Image();
        img.src = '/storage/' + path;
        img.onerror = function () {
            // The image failed to load.
            setProfileImage(false);
            setProfileLetter(title.charAt(0).toUpperCase());
        };
        img.onload = function () {
            // The image has loaded successfully.
            setProfileImage(true);
        };
    }

    const handleImageError = (event) => {
        event.target.src = '../../../images/project-default.jpg'; // Set the fallback image URL
    };

    const handleImageErrorData = (event) => {
        event.target.src = '../../../images/data-default.jpg'; // Set the fallback image URL
    };

    return (
        <BaseLayout title={"Topic"}>
            <div className="single-post-title-section">

                {/* Begin Header */}
                <Container>
                    <Grid container>
                        <Grid item sm={12} md={6} lg={6} mt={3}>
                            <Link style={{
                                color: '#8ea93c'
                            }} to={`/organizations/`}>
                                {/* <Typography sx={{ fontSize: '12px' }}>Organisations</Typography> */}
                            </Link>

                            {/* <Typography sx={{ fontSize: '12px' }}>Organisations</Typography> */}
                        </Grid>
                        <Grid item sm={12} md={6} lg={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            {/* <AddButton
                                title="Do you work on environmental issues in Sri Lanka"
                                link="/add-whatson"
                                linkLabel="Add Your Event" /> */}
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item sm={12} md={6} lg={6}>
                            {loaders.title ? (
                                <div>
                                    <Skeleton variant="text" sx={{ fontSize: '32px' }} />
                                    <Skeleton variant="text" width={'60%'} sx={{ fontSize: '32px' }} />
                                </div>
                            ) : (
                                <Stack direction="row" spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                    {profileImage ? (<div className="org-profile-picture" style={{ backgroundImage: 'url(/storage/' + organization.logo + ')' }}></div>) : (
                                        <div className="org-profile-picture prof-letter">
                                            {profLetter}
                                        </div>
                                    )}
                                    <Typography variant="h1" sx={{ fontWeight: '500', marginBottom: '8px !important' }}>{title}</Typography>
                                </Stack>

                            )}

                            {loaders.title ? (
                                <div>
                                </div>
                            ) : (
                                <Typography sx={{ fontSize: '14px' }} mb={2}>{address}</Typography>
                            )}
                        </Grid>
                        <Grid item sm={12} md={6} lg={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <AddButton
                                title="Do you work on environmental issues in Sri Lanka"
                                link="/login"
                                linkLabel="Join Mihidora" />
                            <VolunteerModalButton
                                linkLabel="I want to Help / Volunteer" notificationEmail={organization.email}/>
                                
                        </Grid>
                    </Grid>
                    <Grid container>
                        {loaders.organization ? (
                            <Grid item sm={12} md={6} lg={6}>
                                <Skeleton variant="text" width={100} height={40} />
                            </Grid>
                        ) : (
                            <Grid item sm={12} md={6} lg={6}>
                                <ul className="related-tags">
                                    <li><Link to=''>
                                        <Chip sx={{ marginTop: '5px', backgroundColor: '#edf7c9' }} label={organization.type} />
                                    </Link></li>
                                </ul>
                            </Grid>
                        )}
                        {loaders.organization ? (
                            <Grid item sm={12} md={6} lg={6}>
                                <Skeleton variant="text" width={100} />
                            </Grid>
                        ) : (
                            <Grid item mt={2} sm={12} md={6} lg={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <AccountCircleOutlinedIcon style={{ color: '#8ea93c' }} />
                                <Typography sx={{ fontSize: '14px', color: '#8ea93c' }} ml={1} mr={1}>{organization.primaryContactPerson}</Typography>
                                <a href={`mailto:${organization.email}?subject=Hello&body=""`} style={{ display: 'flex', color: '#8ea93c' }}>
                                    <EmailOutlinedIcon style={{ color: '#8ea93c' }} />
                                    <Typography sx={{ fontSize: '14px' }} ml={1} mr={1}>{organization.email}</Typography>
                                </a>
                                <a href="tel:+1234567890" style={{ display: 'flex', color: '#8ea93c' }}>
                                    <LocalPhoneOutlinedIcon style={{ color: '#8ea93c' }} />
                                    <Typography sx={{ fontSize: '14px' }} ml={1}>{organization.phone}</Typography>
                                </a>
                            </Grid>
                        )}
                    </Grid>
                </Container>
                {/* End Patrick */}

                {/* Main Image */}
                <Container>
                    <Grid container mt={3}>
                        <Grid item sm={12} md={12} lg={6} pr={2}>

                            <p>{description.description}</p>
                        </Grid>
                        {images !== null ? (
                            <Grid item sm={12} md={12} lg={6}>
                                {images.length > 0 ? (
                                    <CardMedia
                                        component="img"
                                        height="350"
                                        image={`/storage/` + images[0]}
                                        alt="Project Image"
                                        loading="lazy"
                                    />
                                ) : (
                                    <CardMedia
                                        component="img"
                                        height="350"
                                        image={`../../../images/project-default.jpg`}
                                        alt="Project Image"
                                        loading="lazy"
                                    />
                                )}

                            </Grid>
                        ) : (
                            <Grid item sm={12} md={12} lg={6}>
                                <CardMedia
                                    component="img"
                                    height="350"
                                    image={`../../../images/project-default.jpg`}
                                    alt="Project Image"
                                    loading="lazy"
                                />
                            </Grid>
                        )}

                    </Grid>
                </Container>
                {/* End Main Image */}

                <Container>
                    <Grid container mt={4}>
                        {loaders.tags ? (
                            <Grid item xs={12}>
                                <Skeleton variant="text" width={'10%'} sx={{ fontSize: '32px' }} />
                            </Grid>
                        ) : (
                            <Grid item xs={12}>

                                <ul className="related-tags">
                                    {tags.map((tag) => (
                                        <li><Link to=''>
                                            <Chip sx={{ marginTop: '5px', backgroundColor: '#edf7c9' }} label={tag.name} />
                                        </Link></li>
                                    ))}

                                    {/* <li><Link to=''>
                                        <Chip sx={{ marginTop: '5px', backgroundColor: '#edf7c9' }} label={'Policy & Administration'} />
                                    </Link></li> */}
                                </ul>
                                {/* <ul className="related-tags">

                                    {project.tags.length !== 0 ?
                                        <li><Link to=''>
                                            <Chip sx={{ marginTop: '5px', backgroundColor: '#edf7c9' }} label={project.tags[0].name.substring(0, 20)} />
                                        </Link></li>
                                        : ''}
                                </ul> */}
                            </Grid>
                        )}
                    </Grid>
                </Container>

                {/* Begin content provided by organization */}
                <Container>
                    <Grid container mt={4}>
                        <Grid item xs={12}>
                            <Typography sx={{ fontSize: '16px' }}>Content contributed by {title} </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <OrganizationContent slug={postParams.slug} />
                        </Grid>
                    </Grid>
                </Container>
                {/* End content provided by organization */}

            </div>

            <Container style={{ marginBottom: '24px' }}>

            </Container>
        </BaseLayout>
    )
}

export default SingleOrganization
