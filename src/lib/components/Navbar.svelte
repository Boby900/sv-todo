<script>
    import { onMount } from 'svelte';
    
    let isOpen = false;
    let activeDropdown = null;
    
    const toggleMenu = () => {
      isOpen = !isOpen;
    };
    
    const toggleDropdown = (name) => {
      activeDropdown = activeDropdown === name ? null : name;
    };
    
    const setActiveDropdown = (name) => {
      activeDropdown = name;
    };
    
    const clearActiveDropdown = () => {
      activeDropdown = null;
    };
    
    const navigation = [
      { name: 'Home', href: '#', current: true },
      { name: 'About', href: '#', current: false },
      { name: 'Login', href: '#', current: false },
    ];
  </script>
  
  <nav class="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">B</span>
            </div>
            <span class="text-xl font-bold text-gray-900">todo-sv</span>
          </div>
        </div>
  
        <!-- Desktop Navigation -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-1">
            {#each navigation as item}
              <div class="relative">
                {#if item.dropdown}
                  <div
                    class="relative"
                    on:mouseenter={() => setActiveDropdown(item.name)}
                    on:mouseleave={clearActiveDropdown}
                    role="button"
                    tabindex="0"
                  >
                    <button class="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200">
                      {item.name}
                      <svg class="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {#if activeDropdown === item.name}
                      <div class="absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transform transition-all duration-200 ease-out">
                        <div class="py-1">
                          {#each item.dropdown as dropdownItem}
                            <a
                              href={dropdownItem.href}
                              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
                            >
                              {dropdownItem.name}
                            </a>
                          {/each}
                        </div>
                      </div>
                    {/if}
                  </div>
                {:else}
                  <a
                    href={item.href}
                    class="px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 {item.current
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}"
                  >
                    {item.name}
                  </a>
                {/if}
              </div>
            {/each}
          </div>
        </div>
  
        <!-- CTA Button -->
        <div class="hidden md:block">
          <button class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
            <a href="/todo/hello">Get Started</a>
          </button>
        </div>

      </div>
    </div>
  </nav>