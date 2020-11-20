/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */


//CKEDITOR.editorConfig = function( config ) {
// Define changes to default configuration here. For example:
// config.language = 'fr';
// config.uiColor = '#AADC6E';
//};
CKEDITOR.editorConfig = function (config) {
	config.language = 'en';
	config.allowedContent = true;
	config.toolbarGroups = [{
			name: 'document',
			groups: ['mode', 'document', 'doctools']
		},
		{
			name: 'clipboard',
			groups: ['clipboard', 'undo']
		},
		{
			name: 'editing',
			groups: ['find', 'selection', 'spellchecker', 'editing']
		},
		{
			name: 'forms',
			groups: ['forms']
		},
		{
			name: 'basicstyles',
			groups: ['basicstyles', 'cleanup']
		},
		{
			name: 'paragraph',
			groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph']
		},
		{
			name: 'links',
			groups: ['links']
		},
		{
			name: 'insert',
			groups: ['insert']
		},
		{
			name: 'styles',
			groups: ['styles']
		},
		{
			name: 'colors',
			groups: ['colors']
		},
		{
			name: 'tools',
			groups: ['tools']
		},
		{
			name: 'others',
			groups: ['others']
		},
		{
			name: 'about',
			groups: ['about']
		}
	];

	config.removeButtons = 'Save,NewPage,Preview,Print,Templates,Undo,Redo,Find,Replace,SelectAll,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Subscript,Superscript,CopyFormatting,RemoveFormat,Outdent,Indent,CreateDiv,BidiLtr,BidiRtl,Language,Anchor,Flash,Smiley,PageBreak,Iframe,Maximize,ShowBlocks,About,PasteFromWord,SpecialChar,Cut,Copy,Paste,PasteText';
};