import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { DataService } from '../data.service';

interface FilepickerNode {
  name: string;
  children?: FilepickerNode[];
}

const TREE_DATA: FilepickerNode[] = [
  {
    name: 'root',
    children: [
      {
        name: 'dir1',
        children: [{ name: 'diry', children: [{ name: 'file3.ext' }] }],
      },
      {
        name: 'dir2',
        children: [
          {
            name: 'dirx',
            children: [{ name: 'file.ext' }, { name: 'file1.ext' }],
          },
          { name: 'file2.ext' },
        ],
      },
      {
        name: 'dir3',
        children: [{ name: 'dirz', children: [{ name: 'file4.ext' }] }],
      },
      {
        name: 'dir4',
        children: [{ name: 'dira', children: [{ name: 'file5.ext' }] }],
      },
      {
        name: 'dir5',
        children: [{ name: 'dirb', children: [{ name: 'file6.ext' }] }],
      },
      {
        name: 'dir6',
        children: [
          {
            name: 'dir0',
            children: [
              { name: 'file7.ext' },
              { name: 'file8.ext' },
              { name: 'file9.ext' },
            ],
          },
        ],
      },
      {
        name: 'dir7',
        children: [
          {
            name: 'dirc',
            children: [
              {
                name: 'dire',
                children: [{ name: '' }],
              },
              {
                name: 'dirv',
                children: [
                  {
                    name: 'file11.ext',
                  },
                ],
              },
              { name: 'file12.ext' },
            ],
          },
        ],
      },
      { name: 'file10.ext' },
    ],
  },
];

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css'],
})
export class BrowserComponent {
  treeControl = new NestedTreeControl<FilepickerNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<FilepickerNode>();

  constructor(private data: DataService) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FilepickerNode) =>
    !!node.children && node.children.length > 0;

  ngOnInit(): void {}

  getAncestors = (array: string | any[], name: any) => {
    if (typeof array != 'undefined') {
      for (let i = 0; i < array.length; i++) {
        if (array[i].name === name) {
          return [array[i]];
        }
        const a: any = this.getAncestors(array[i].children, name);
        if (a !== null) {
          a.unshift(array[i]);
          return a;
        }
      }
    }
    return null;
  };

  onLeafNodeClick = (node: FilepickerNode) => {
    const ancestors = this.getAncestors(this.dataSource.data, node.name);
    this.treeControl.collapse(ancestors[0]);
    let path = '';
    ancestors.forEach((ancestor: { name: any }) => {
      path += `${ancestor.name}/`;
    });
    console.log(path);
    this.data.changeMessage(path);
    return path;
  };

  clearInput = () => {
    this.data.changeMessage('');
  };
}
