// temporary route: ****************************************************************
// @description: Register new user
// // @route: GET /api/users
// // @access: Public
exports.getUsers = async (req, res) => {
	res.send(DummyPosts);
};
// **********************************************************************************
const DummyPosts = [
	{
		_id: '1',
		title: 'Przykładowy post 1',
		snippet:
			'This is meant as a blog content: In May and June 2020, the death of 350 elephants in Botswana’s Okavango delta baffled conservationists and sparked global speculation about what had caused it. Elephants of all ages and both sexes were affected, with many walking in circles before dying suddenly, collapsing on their faces. Two months later, 35 more elephants died in north-western Zimbabwe.The bacterial infection has not previously been linked to elephant deaths, according to the paper published in the Nature Communications journal. Researchers believe it could have been the same one responsible for the deaths in neighbouring countries. This represents an important conservation concern for elephants in the largest remaining meta-population of this endangered species,” researchers wrote in the paper. It was written by an international team of researchers from the Victoria Falls Wildlife Trust, the University of Surrey, laboratories in South Africa and the UK government’s Animal and Plant Health Agency (APHA).',
		author: 'Majk',
		content: `
    ## This is meant as a \n \n const blog: string = "";\n content: In May and June 2020,\n ## the death\n of 350 elephants in Botswana ##Okavango delta **baffled** cons
    `,
		slug: '',
		createdAt: new Date('04-15-1977'),
	},
	{
		_id: '2',
		title: 'Przykładowy post 2',
		snippet:
			'tionists and sparked global speculation about what had caused it. Elephants of all ages and both sexes were affected, with many walking in circles before dying suddenly, collapsing on their faces. Two months later, 35 more elephants died in north-western Zimbabwe.The bacterial infection has not previously been linked to elephant deaths, according to the paper published in the Nature Communications journal. Researchers believe it could have been the same one responsible for the deaths in neighbouring countries. This represents an important conservation concern for elephants in the largest remaining meta-population of this endangered species,” researchers wrote in the paper. It was written by an international team of researchers from the Victoria Falls Wildlife Trust, the University of Surrey, laboratories in South Africa and the UK government’s Animal and Plant Health Agency (APHA).',
		author: 'Majk',
		content:
			'sdsf sfsffsfs fsffsf fsfsdrdpdrdpdrdrdrpdrpdrpdr drp drp dprdr drp pdrprprrp rdprp dpdpdp prpdpr pdrpdrprdrp',
		slug: '',
		createdAt: new Date('04-15-1977'),
	},
	{
		_id: '3',
		title: 'Przykładowy post 3',
		snippet:
			'This is meant as a blog content: In May and June 2020, the death of 350 elephants in Botswana’s Okavango delta baffled conservationists and sparked global speculation about what had caused it. Elephants of all ages and both sexes were affected, with many walking in circles before dying suddenly, collapsing on their faces. Two months later, 35 more elephants died in north-western Zimbabwe.The bacterial infection has not previously been linked to elephant deaths, according to the paper published in the Nature Communications journal. Researchers believe it could have been the same one responsible for the deaths in neighbouring countries. This represents an important conservation concern for elephants in the largest remaining meta-population of this endangered species,” researchers wrote in the paper. It was written by an international team of researchers from the Victoria Falls Wildlife Trust, the University of Surrey, laboratories in South Africa and the UK government’s Animal and Plant Health Agency (APHA).',
		author: 'Majk',
		content:
			's a blog content: In May and June 2020, the death of 350 elephant',
		slug: '',
		createdAt: new Date('04-15-1977'),
	},
	{
		_id: '4',
		title: 'Przykładowy post 3',
		snippet:
			'This is meant as a blog congo delta baffled conservaticollapsing d in north- been linked to elephant deaths, according to the paper published in the Nature Communications journal. Researchers believe it could have been the same one responsible for the deaths in neighbouring countries. This represents an important conservation concern for elephants in the largest remaining meta-population of this endangered species,” researchers wrote in the paper. It was written by an international team of researchers from the Victoria Falls Wildlife Trust, the University of Surrey, laboratories in South Africa and the UK government’s Animal and Plant Health Agency (APHA).',
		author: 'Majk',
		content: 's a blog conne 2020, the death of 350 elephant',
		slug: '',
		createdAt: new Date('04-15-1977'),
	},
];
